var _ = require('lodash');

var SassNode = function (options) {
    var self = this,
        settings = {
            includeTagName: false
        }, node = {
            lineNumber: -1,
            children: [],
            classList: [],
            class: '',
            body: '',
            selector: '',
            id: '',
            tag: 'div'
        };

    // inherit passed values
    for (var property in options) {
        if (node.hasOwnProperty(property) && options.hasOwnProperty(property)) {
            if(property == 'class' && options[property]){
                node.classList.push(options[property]);
                node.class = options[property];
            } else if(options[property]){
                node[property] = options[property];
            }
        }
    }

    this._updateBody = function() {
        var text = '';
        _.forEach(node.children, function (childNode, index, arr) {
            text += childNode.compileCSS();
        });
        node.body = text;
        return this;
    };

    this._updateSelector = function() {
        node.class = (node.classList.length > 0) ? ('.' + node.classList.join('.')) : '';
        node.selector = this.getTag() + ((node.id) ? '#' + node.id : '') + node.class;
        return this;
    };

    this.set = function (property, value) {
        if (node.hasOwnProperty(property) && (_.isString(value) || _.isNumber(value))) {
            switch (property) {
                case 'class':
                    node.classList.push(value);
                    node.class += ((node.class.length > 0)?' ':'')+value;
                    break;
                default:
                    node[property] = value;
                    break;
            }
            this._updateSelector();
        } else {
            console.error('attempting to set invalid property: ', property);
        }
    };

    this.get = function (property) {
        switch (property) {
            case 'class':
                return node.class;
            case 'body':
                this._updateBody();
                return node.body;
            default:
                return node[property];
                break;
        }
    };

    this.getNode = function () {
        return node;
    };

    this.getLineNumber = function () {
        return node.lineNumber;
    };

    this.getBody = function () {
        this._updateBody();
        return node.body;
    };

    this.getTag = function(){
        //return ((settings.includeTagName) ? node.tag : '');
        return ((settings.includeTagName) ? node.tag : '');
    };

    this.compileCSS = function () {
        return this._compileNestedCSS();
    };

    this._compileNestedCSS = function () {
        var id = this.get('id'),
            rootSelector = (id)?'#'+id:'',
            childrenSelectors = [],
            cssText = '',
            cssInnerText = '';
        if(node.classList.length > 0){
            rootSelector = '.'+node.classList[0];
            if(id.length > 0) childrenSelectors.push('&#'+id);
            for(var i = 1; i < node.classList.length; i++){
                childrenSelectors.push('&.'+node.classList[i])
            }
        }

        if(id.length == 0 && node.classList.length == 0 && childrenSelectors.length == 0){
            // quit if there are no attributes to print
            return '';
        }

        cssText += this.getTag() + rootSelector + '{\n';
        _.forEach(childrenSelectors, function(selector, index, arr){
            cssInnerText += '\n\t' + selector+ '{\n\t\t\n\t}\n';
        });
        cssText += ((cssInnerText.length > 0)?cssInnerText:'\n\t\t\n') + '}\n';
        return cssText;
    };

    this._compileSpecificCSS = function () {
        this._updateSelector();
        this._updateBody();
        return node.selector + "{ \t" + node.body + "\n}\n";
    };

    this.createChild = function (childSelector) {
        var childNode = new SassNode();
        childNode.set('selector', childSelector);
        // TODO - createChild function should parse selector into appropriate fields
        node.children.push(childNode);
        return this;
    };

    this.addChild = function (childNode) {
        node.children.push(childNode);
        return this;
    };

    var publicFunctions = {};
    _.forEach(this, function(property, propertyName, arr){
        if(_.isFunction(property) && propertyName[0] != '_'){
            publicFunctions[propertyName] =  function(){ return self[propertyName].apply(self, arguments)}
        }
    });
    return publicFunctions;
};

module.exports = SassNode;