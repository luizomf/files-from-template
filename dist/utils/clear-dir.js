"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var fs = require('fs');
var resolve = require('path').resolve;
var clearDir = function (baseDir) {
    var files = fs.readdirSync(baseDir);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var realPath = resolve(baseDir, file);
        if (fs.lstatSync(realPath).isDirectory()) {
            clearDir(realPath);
        }
        else {
            fs.unlinkSync(realPath);
        }
    }
    var dirs = fs.readdirSync(baseDir);
    for (var _a = 0, dirs_1 = dirs; _a < dirs_1.length; _a++) {
        var dir = dirs_1[_a];
        var realPath = resolve(baseDir, dir);
        fs.rmdirSync(realPath);
    }
};
module.exports = { clearDir: clearDir };
