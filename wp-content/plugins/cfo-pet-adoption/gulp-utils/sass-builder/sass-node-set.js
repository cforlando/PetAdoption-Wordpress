var _ = require('lodash');

var SassNodeSet = function () {
    var nodeSet = [];

    this.count = function () {
        return nodeSet.length;
    };

    this.push = function (node) {
        nodeSet.push(node);
        return this;
    };

    this.atLine = function (index) {
        var result = false;
        _.forEach(nodeSet, function(sassNode){
            if (index == sassNode.get('lineNumber')) result = sassNode;
        });
        return result;
    };

    this.hasLine = function (index) {
        return !!(this.atLine(index));
    };
    return this;
};

module.exports = SassNodeSet;