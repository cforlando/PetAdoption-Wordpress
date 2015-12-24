var _ = require('lodash'),
    libsass = require('node-sass'),
    SassNode = require('../../sass-builder/sass-node'),
    SassNodeSet = require('../../sass-builder/sass-node-set');

describe('Sass Builder', function(){
    var defaultSassNode,
        defaultSassNodeSet,
        testClassList = ['test1', 'test2', 'test3'];

    describe('Sass Node', function(){

        beforeEach(function(){
           defaultSassNode = new SassNode();
        });

        it("can create an object representation of a Sass node", function(){
            var sassNode = new SassNode({
                testArg : false
            }),
                defaultSassNodeSet = new SassNodeSet();
            expect(sassNode.getNode()).toEqual(jasmine.any(Object));
        });

        it('properly stores id and tag properties in the Sass node on initialization', function(){

            var sassNodeProperties = {
                lineNumber : 11,
                id : 'testId',
                tag : 'testTag',
                class: 'testClass'
            },
                sassNode = new SassNode(sassNodeProperties);
            expect(sassNode.getNode()).toEqual(jasmine.objectContaining(sassNodeProperties));
        });

        it('creates an array list of saved class names', function(){
            for(var i = 0; i < testClassList.length; i++){
                defaultSassNode.set('class', testClassList[i]);
            }
            expect(defaultSassNode.getNode().classList).toEqual(testClassList);
        });

        it('prints proper selector when only id passed', function(){
            defaultSassNode.set('id', 'testId');
            expect(defaultSassNode.get('selector')).toEqual('#testId');
        });

        it('updates line number when set', function(){
            var testLineNumber = 10;
            defaultSassNode.set('lineNumber', testLineNumber);
            expect(defaultSassNode.get('lineNumber')).toEqual(testLineNumber);
        });

        it('creates a selector string for each node', function(){
            for(var i = 0; i < testClassList.length; i++){
                defaultSassNode.set('class', testClassList[i]);
            }
            defaultSassNode.set('id', 'testId');
            expect(defaultSassNode.get('selector')).toEqual('#testId.test1.test2.test3');
        });

        it('properly saves a sub sass node', function(){
            var childNode = new SassNode({
                id : 'childId'
            });
            defaultSassNode.addChild(childNode);
            expect(_.findIndex(defaultSassNode.get('children'), childNode)).not.toBeLessThan(0);
        });

        it('generates correct css when id and tag are set at initialization', function(){
            //var testSassText = '.tclasss1{\n\n\t&#testId{\n\t\t\n\t}\n\n\t&.tclass2{\n\t\t\n\t}\n}\n',
            var testSassText = '.tclass1{&#testId{}&.tclass2{}}',
                testSassNode = new SassNode({
                id : 'testId',
                tag : 'h1'
            });
            testSassNode.set('class', 'tclass1');
            testSassNode.set('class', 'tclass2');
            expect(testSassNode.compileCSS().replace(/[\n\t]/ig,'')).toEqual(testSassText);
            //expect(testSassNode.compileCSS()).toEqual(testSassText);
        });

        it('generates correct css when only id is set', function(){
            var testSassText = '#testId{}',
                testSassNode = new SassNode({
                id : 'testId'
            });
            expect(testSassNode.compileCSS().replace(/[\n\t]/ig,'')).toEqual(testSassText);
        });

        it('does not generate any text if no attributes are set', function(){
            var tSassNode = new SassNode();
            expect(tSassNode.compileCSS()).toEqual('');
        });

        it('appends additional classes after first class is set', function(){
            var tSassNode = new SassNode({
                class : testClassList[0]
            });
            tSassNode.set('class',  testClassList[1]);
            expect(tSassNode.getNode().classList).toEqual(jasmine.arrayContaining([testClassList[0], testClassList[1]]))
        });

        xit("generates the proper css when containing a child class", function(){
            pending('execution method pending');
        })
    });


    describe("Sass Node List", function(){

        beforeEach(function(){
            defaultSassNode = new SassNode();
            defaultSassNodeSet = new SassNodeSet();
        });

        it('can determine whether a line number has been previously processed', function(){
            defaultSassNode.set('lineNumber', 10);
            defaultSassNodeSet.push(defaultSassNode);
            expect(defaultSassNodeSet.hasLine(defaultSassNode.get('lineNumber'))).toBe(true);
        });

        it('can get a previously added sass node by line number', function(){
            var testLineNumber = 10;
            defaultSassNode.set('lineNumber', testLineNumber);
            defaultSassNodeSet.push(defaultSassNode);
            expect(defaultSassNodeSet.atLine(testLineNumber).getNode()).toEqual(defaultSassNode.getNode());
        })
    })

});