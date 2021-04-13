#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
var handlebars_1 = __importDefault(require("handlebars"));
var yargs_1 = __importDefault(require("yargs"));
var argv = yargs_1.default.command('configFiles', 'Path to the config files').argv;
var readFiles = function (args) {
    if (!args.configFiles) {
        throw new Error('No path to work with.');
    }
    var path = args.configFiles;
    try {
        var stat = fs_1.default.lstatSync(path);
        var rootDir = path;
        if (!stat.isDirectory) {
            throw new Error(path + " is not a directory");
        }
        var files = fs_1.default.readdirSync(rootDir);
        console.log();
        var _loop_1 = function (file) {
            if (!file.endsWith('.json')) {
                console.log(chalk_1.default.bold.red(file), 'is not a json file. Skipping...');
                return "continue";
            }
            var filePath = path_1.resolve(rootDir, file);
            Promise.resolve().then(function () { return __importStar(require(filePath)); }).then(function (contents) {
                readFileContents(contents, filePath, args);
            })
                .catch(function (e) {
                displayError(e);
            });
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            _loop_1(file);
        }
    }
    catch (e) {
        displayError(e);
    }
};
var validateFileContents = function (contents, filePath) {
    if (!contents.outputFilePath) {
        throw new TypeError("Please, provide 'outputFilePath' to " + filePath);
    }
    if (!contents.templateFilePath) {
        throw new TypeError("Please, provide 'templateFilePath' to " + filePath);
    }
};
var readFileContents = function (contents, filePath, args) {
    validateFileContents(contents, filePath);
    var outputFilePath = contents.outputFilePath, templateFilePath = contents.templateFilePath, _a = contents.template, template = _a === void 0 ? {} : _a;
    var outputFilePathTemplate = handlebars_1.default.compile(outputFilePath);
    var compiledOutputFilePath = outputFilePathTemplate(args);
    var templateFilePathTemplate = handlebars_1.default.compile(templateFilePath);
    var compiledTemplateFilePath = templateFilePathTemplate(args);
    var templateFileContents = handlebars_1.default.compile(fs_1.default.readFileSync(compiledTemplateFilePath, {
        encoding: 'utf-8',
    }));
    var compiledFileContents = templateFileContents(__assign(__assign({}, template), args));
    var baseOutputDir = path_1.dirname(compiledOutputFilePath);
    if (!fs_1.default.existsSync(baseOutputDir)) {
        fs_1.default.mkdirSync(baseOutputDir);
    }
    fs_1.default.writeFile(compiledOutputFilePath, compiledFileContents, {
        encoding: 'utf-8',
    }, function (error) {
        if (error) {
            displayError(error);
        }
        console.log(chalk_1.default.green("File " + compiledOutputFilePath + " written successfully."));
    });
};
var displayError = function (error) {
    console.log();
    console.error(chalk_1.default.red('Error name:'), error.name);
    console.error(chalk_1.default.red('Error message:'), error.message);
    console.error(chalk_1.default.red('Error stack:'), error.stack);
    console.log();
};
if (argv === null || argv === void 0 ? void 0 : argv.configFiles) {
    readFiles(argv);
}
else {
    displayError(new Error('Please, provide --config-files="./path-to-config-files"'));
}
