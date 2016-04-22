'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './';
        this.build = './dist';

        this.tsOutputPath = this.build + '/';
        this.allJavaScript = [this.build + '/**/*.js', '!'+this.build + "test/**/*.js"];
        this.allTypeScript = [this.source + '/**/*.ts', '!'+this.source + "test/**/*.ts", "!node_modules/**/*.ts", "!dist/**/*.ts", "!index.d.ts"];
        this.allTestsSource = './test/**/*.ts';
        this.testPath = this.build + "/test";
        this.allTests = this.testPath + "/**/*.js";

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + '/**/*.d.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;
