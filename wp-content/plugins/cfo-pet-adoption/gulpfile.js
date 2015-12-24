var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    gulp = require('gulp'),
    customJade = require('jade'),
    jade = require('gulp-jade'),
    _ = require('lodash'),
    argv = require('yargs').argv,
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    libsass = require('node-sass'),
    projectDirectory = __dirname,
    jsJadeDirectory = path.resolve(projectDirectory, 'js/modules/views/html/'),
    phpJadeDirectory = path.resolve(projectDirectory, 'jade/'),
    sassDirectory = path.resolve(projectDirectory, 'sass/');

gulp.task('sass', function () {
    var sassPath = path.resolve(projectDirectory, 'sass/'),
        writePath = path.resolve(projectDirectory, 'public/stylesheets/'),
        sassGlob = path.join(sassPath, '/[!_]*.scss'),
        includes = [path.resolve(sassPath, 'compass-mixins/')];

    gulp.src(sassGlob)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: includes,
            style: 'expanded', //nested, expanded, compact, compressed,
            indentedSyntax: false,
            functions: {
                'auto-em($font-size)': function ($size) {

                }
            }
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(writePath));
});

gulp.task('sass-debug', function () {
    var sassPath = path.resolve(projectDirectory, 'sass/'),
        writePath = path.resolve(projectDirectory, 'public/stylesheets/'),
        sassTestFilePath = path.join(sassPath, '/pet-adoption.scss'),
        includes = [path.resolve(sassPath, 'compass-mixins/')];

    console.log('includes:', includes);

    libsass.render({
        includePaths: includes,
        file: sassTestFilePath
    }, function (err, result) {
        console.log('Error:\n%s\n\nResult:\n%j', err, result);
    });
});

gulp.task('sass-auto', function(){
    gulp.watch(path.join(sassDirectory, '/**/*.scss'), ['sass']);
});

gulp.task('jade-to-sass', function () {
    var jadeRegex = /\.jade$/i,
        jadePath = path.resolve(projectDirectory, 'jade/'),
        sassBuilder = require('./gulp-utils/sass-builder'),
        pathUtils = path,
        index = 0;

    console.log("Reading ", jadePath);
    recursePath(jadePath, {
        each: function (err, filePath) {
            // executes on each file path
            //console.log("file - ", filePath);
            if (jadeRegex.test(filePath)) {
                fs.readFile(filePath, function (err, data) {
                    if (err) throw err;
                    console.log('reading: ', filePath);
                    var parsedPath = path.parse(filePath),
                        filename = parsedPath.name;
                    //console.log("checking...", parsedPath);
                    if ((argv['index'] && (filename.indexOf(argv['index']) > -1)) || (argv['index'] == undefined)) {
                        sassBuilder.jadeToSass(String(data), pathUtils.resolve('./', 'sass-' + filename + '.scss'));
                    }
                    index++;
                });
            }
        }
    });
});

customJade.filters.php = function (text) {
    return '<?php ' + text + ' ?>';
};

customJade.filters.js = function (text) {
    return '<% ' + text + ' %>';
};

gulp.task('jade', function () {
    var jsJadeGlob = path.join(jsJadeDirectory, '/**/[^_]*.jade');
    gulp.src(jsJadeGlob)
        .pipe(jade({
            pretty: (argv['pretty']) ? true : false,
            jade: customJade,
            doctype: 'html'
        }))
        .on('error', onError)
        .pipe(gulp.dest(jsJadeDirectory));
});

gulp.task('jade-php', function () {
    var phpJadeGlob = path.join(phpJadeDirectory, '/**/[^_]*.jade');
    gulp.src(phpJadeGlob)
        .pipe(jade({
            pretty: (argv['pretty']) ? true : false,
            jade: customJade,
            doctype: 'html'
        }))
        .on('error', onError)
        .pipe(rename({
            extname: ".php"
        }))
        .pipe(gulp.dest(path.join(projectDirectory, 'public/views/')));
});

gulp.task('jade-auto', function () {
    gulp.watch(path.join(jsJadeDirectory, '/**/*.jade'), ['jade']);
    gulp.watch(path.join(phpJadeDirectory, '/**/*.jade'), ['jade-php']);
});

gulp.task('auto', function () {

    gulp.watch(path.join(jsJadeDirectory, '/**/*.jade'), ['jade']);
    gulp.watch(path.join(phpJadeDirectory, '/**/*.jade'), ['jade-php']);
    gulp.watch(path.join(sassDirectory, '/**/*.scss'), ['sass']);
});

gulp.task('test', function(){
    exec('jasmine', function (err, stdout, stderr) {
        console.log('results:\n', stdout);
    });
});

gulp.task('build-js', function () {
    exec('r.js -o js/build.js', function (err, stdout, stderr) {
        if(err) console.error(err);
        console.log('stderr:\n %s\n', stderr);
        console.log('results:\n %s\n', stdout);
    })
});


/**
 *
 * @param dir
 * @param options {object}
 * @param options.each {function} executed on each file
 * @param options.done {function} executed when all files have been processed
 */
var recursePath = function (dir, options) {
    var results = [],
        remainingFilesCount = 0,
        _options = _.extend({}, options);

    function readPath(rootPath, options) {
        fs.stat(rootPath, function (err, pathMeta) {
            if (err) {
                console.error(err);
                if (_.isFunction(options.done)) options.done.call(null, err);
                if (_.isFunction(options.each)) options.each.call(null, err);
            } else if (pathMeta.isDirectory()) {
                fs.readdir(rootPath, function (err, fileList) {
                    if (err) return done(err);
                    remainingFilesCount += fileList.length;
                    fileList.forEach(function (fileName) {
                        var childPath = path.resolve(rootPath, fileName);
                        readPath(childPath, options);
                    });
                    remainingFilesCount--;
                });
            } else if (pathMeta.isFile()) {
                results.push(rootPath);
                if (_.isFunction(options.each)) options.each.call(null, null, rootPath);
                remainingFilesCount--;
                if (remainingFilesCount < 0 && _.isFunction(options.done)) options.done.call(null, null, results);
            }
        });
    }

    readPath(dir, _options);
};

function onError(err) {
    console.log(err);
    this.emit('end');
}
