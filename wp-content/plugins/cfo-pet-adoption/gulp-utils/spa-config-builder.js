var through = require('through2'),    // npm install --save through2
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

/**
 *
 * @param {String} dir
 * @param {object} options
 * @param {Function} options.each
 * @param {Function} options.done
 */
function walk (dir, options) {
    var fsFinder = path,
        results = [],
        pending = 0;
    function recurse(path, done) {
        fs.stat(path, function (err, stat) {
            if (err){
                options.done.call(null, err);
                options.each.call(null, err);
                return;
            }
            if (stat.isDirectory()) {
                fs.readdir(path, function (err, list) {
                    if (err) return options.done(err);
                    pending += list.length;
                    list.forEach(function (fileName) {
                        var childPath = fsFinder.resolve(path, fileName);
                        recurse(childPath, options.done)
                    });
                    pending--;
                });
            } else if(stat.isFile()) {
                results.push(path);
                if(options.each) options.each.call(null, null, path);
                pending--;
                if (pending < 0) options.done.call(null, null, results);
            }
        });
    }
    recurse(dir,options.done);
}

function isScript(fileName){
    var jsRegex = /.*\.js$/;
    return jsRegex.test(fileName);
}

function isPHP(fileName){
    var phpRegex = /.*\.php$/;
    return phpRegex.test(fileName);
}

module.exports = {
    /**
     * Creates a JSON file containing file names of scripts that have been paired with PHP templates. "Paired" simply means the base names match..
     * @param options
     * @param {String} options.scripts Root path of js
     * @param {String} options.pages Root path of php templates
     */
    build : function(options) {
        var defaults = {
                scriptsDirectory : options.scripts || path.resolve('./src/', 'views'),
                pagesDirectory : options.pages || path.resolve('./wp-content/themes', (options && options.themeDirectory)||'dp-boilerplate/'),
                writeDirectory : path.resolve('./src/', 'modules/'),
                filename : 'views.json'
            },
            scriptsList = [],
            pagesList = [],
            results = [],
            isPageListComplete = false,
            isScriptListComplete = false,
            settings = _.assign({}, defaults, options);
        
        function onFilesRead(){
            console.log('Finding intersection between:', scriptsList, pagesList);
            results = _.intersection(scriptsList, pagesList);
            var writePath = path.resolve(settings.writeDirectory, settings.filename);
            fs.writeFile(writePath, JSON.stringify(results), function(){
                console.log(settings.filename + ' saved to '+writePath);
            });
        }

        walk(settings.pagesDirectory, {
            each : function(err, filepath){
                var filename = path.basename(filepath);
                if(isPHP(filename)) pagesList.push(path.basename(filepath, '.php'));
            },
            done : function(err, filelist){
                isPageListComplete = true;
                if(isScriptListComplete) onFilesRead.apply(null, null);
            }
        });
        walk(settings.scriptsDirectory, {
            each : function(err, filepath){
                var filename = path.basename(filepath);
                if(isScript(filename)) scriptsList.push(path.basename(filepath, '.js'));
            },
            done : function(err, filelist){
                isScriptListComplete = true;
                if(isPageListComplete) onFilesRead.apply(null, null);
            }
        });
    }
};