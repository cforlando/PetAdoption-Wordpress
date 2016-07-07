var fs = require('fs'),
    pathUtils = require('path'),
    _ = require('lodash'),
    Jlex = require('jade-lexer'),
    SassNode = require('./sass-node'),
    SassNodeSet = require('./sass-node-set');



function jadeToSass(jadeText, writePath) {
    var jadeData = Jlex(jadeText, pathUtils.resolve('./', 'jade.txt')),
        numOfNodes = jadeData.length,
        sassOutputPath = writePath,
        sassOutput = "",
        sassDataSet = new SassNodeSet();

    _.forEach(jadeData, function (node) {
        switch(node.type) {
            case 'class':
            case 'tag':
            case 'id':

                if (sassDataSet.hasLine(node.line)) {
                    // additional data at line
                    console.log('Updating line ['+node.line+']... '+ node.type);
                    sassDataSet.atLine(node.line).set(node.type, node.val);
                } else {
                    // new line
                    console.log('Adding line ['+node.line+']... '+ node.type);
                    var nodeMeta = {
                        lineNumber : node.line
                    };
                    nodeMeta[node.type] = node.val;
                    sassDataSet.push(new SassNode(nodeMeta));
                }
                break;
            default:
                console.log('Bypassing '+node.type);
        }
    });

    console.log('sassDataSet: ', sassDataSet);
    for( var lineIndex = 0; lineIndex < numOfNodes; lineIndex++) {
        if(sassDataSet.hasLine(lineIndex)){
            var sassNode = sassDataSet.atLine(lineIndex);
            console.log('printing: ', sassNode.getNode());
            sassOutput += sassNode.compileCSS();
        }
    }

    if (sassOutput.length > 1) {
        fs.writeFile(sassOutputPath, sassOutput, function (err) {
            if (err) throw err;
            console.log('sass saved to: ', sassOutputPath)
        })
    }
}

module.exports = {
    jadeToSass : jadeToSass
};
