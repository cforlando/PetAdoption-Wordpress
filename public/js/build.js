({
    name: 'production-build',
    baseUrl: "./",
    optimize: 'uglify2',
    context: null,
    uglify2 : {
        compress : {
            drop_console : true,
            drop_debugger : true
        }
    },
    include: ["require-lib"],
    waitSeconds : 0,
    mainConfigFile: './rjs-config.js',
    out: "pet-adoption.js"
});
