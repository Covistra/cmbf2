'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    Config = require('./gulp.config'),
    mocha = require('gulp-mocha'),
    typedoc = require('gulp-typedoc'),
    tsProject = tsc.createProject('tsconfig.json'),
    unitProject = tsc.createProject('tsconfig.json');

var config = new Config();


/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = config.allTypeScript.concat(config.libraryTypeScriptDefinitions);

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-tests-ts', function () {
    var sourceTsFiles = [config.allTestsSource].concat(config.libraryTypeScriptDefinitions);

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(unitProject));

    tsResult.dts.pipe(gulp.dest(config.build));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.build));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean', function (cb) {
    var typeScriptGenFiles = [
        config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
        config.tsOutputPath + "/**/*.d.ts",
        config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        '!' + config.tsOutputPath + '/lib'
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('unit', ['ts-lint', 'compile-ts', 'compile-tests-ts'], function() {

    return gulp.src(config.allTests, {read: false})
        .pipe(mocha({reporter: 'nyan'}));

});

gulp.task('doc', ['ts-lint'], function(){
    return gulp
        .src(["cmbf2-core/**/*.ts", "./cmbf2-core.ts"])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es5",
            includeDeclarations: true,

            // Output options (see typedoc docs)
            out: "./doc",
            json: "./doc/options.json",

            // TypeDoc options (see typedoc docs)
            name: "cmbf/2",
            plugins: [],
            ignoreCompilerErrors: false,
            version: true
        }));
});

gulp.task('publish', ['unit']);

gulp.task('default', ['ts-lint', 'compile-ts']);
