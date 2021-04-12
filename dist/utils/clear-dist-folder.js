"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var fs = require('fs');
var resolve = require('path').resolve;
var clearDir = require('./clear-dir').clearDir;
var clearDist = function () {
    var distPath = resolve(__dirname, '..', '..', 'dist');
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    clearDir(distPath);
};
clearDist();
