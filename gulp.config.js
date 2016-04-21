'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src';
        this.build = './dist';

        this.tsOutputPath = this.build + '/src';
        this.allJavaScript = [this.build + '/src/**/*.js'];
        this.allTypeScript = this.source + '/**/*.ts';
        this.allTestsSource = './test/**/*.ts';
        this.testPath = this.build + "/test";
        this.allTests = this.testPath + "/**/*.js";

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + '/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;
