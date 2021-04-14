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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.displayError = exports.readFileContents = exports.validateFileContents = exports.readArgs = exports.readFiles = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var handlebars_1 = __importDefault(require("handlebars"));
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var readFiles = function (commandArguments) { return __awaiter(void 0, void 0, void 0, function () {
    var configFilesPath, lsStat, rootDirectory, configFiles, userAnswers, configFiles_1, configFiles_1_1, configFile, configFilePath, configFileContents, e_1, e_2_1, e_3;
    var e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                configFilesPath = "" + commandArguments['config-files'];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 21, , 22]);
                return [4 /*yield*/, fs_1.promises.lstat(configFilesPath)];
            case 2:
                lsStat = _b.sent();
                rootDirectory = configFilesPath;
                if (!lsStat.isDirectory) {
                    throw new Error("\uD83D\uDEA8 " + configFilesPath + " is not a directory\n");
                }
                return [4 /*yield*/, fs_1.promises.readdir(rootDirectory)];
            case 3:
                configFiles = _b.sent();
                console.log();
                userAnswers = {};
                _b.label = 4;
            case 4:
                _b.trys.push([4, 14, 15, 20]);
                configFiles_1 = __asyncValues(configFiles);
                _b.label = 5;
            case 5: return [4 /*yield*/, configFiles_1.next()];
            case 6:
                if (!(configFiles_1_1 = _b.sent(), !configFiles_1_1.done)) return [3 /*break*/, 13];
                configFile = configFiles_1_1.value;
                if (!configFile.endsWith('.json')) {
                    console.log('🚨 ', chalk_1.default.bold.red(configFile), 'is not a json file. Skipping...\n');
                    return [3 /*break*/, 12];
                }
                configFilePath = path_1.resolve(rootDirectory, configFile);
                _b.label = 7;
            case 7:
                _b.trys.push([7, 10, , 12]);
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(configFilePath)); })];
            case 8:
                configFileContents = _b.sent();
                return [4 /*yield*/, exports.readFileContents(configFileContents, configFilePath, commandArguments, userAnswers)];
            case 9:
                _b.sent();
                return [3 /*break*/, 12];
            case 10:
                e_1 = _b.sent();
                return [4 /*yield*/, exports.displayError(e_1)];
            case 11:
                _b.sent();
                return [3 /*break*/, 12];
            case 12: return [3 /*break*/, 5];
            case 13: return [3 /*break*/, 20];
            case 14:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 20];
            case 15:
                _b.trys.push([15, , 18, 19]);
                if (!(configFiles_1_1 && !configFiles_1_1.done && (_a = configFiles_1.return))) return [3 /*break*/, 17];
                return [4 /*yield*/, _a.call(configFiles_1)];
            case 16:
                _b.sent();
                _b.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 19: return [7 /*endfinally*/];
            case 20: return [3 /*break*/, 22];
            case 21:
                e_3 = _b.sent();
                exports.displayError(e_3);
                return [3 /*break*/, 22];
            case 22: return [2 /*return*/];
        }
    });
}); };
exports.readFiles = readFiles;
var readArgs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var commandArguments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commandArguments = yargs_parser_1.default(process.argv.slice(2), {
                    configuration: {
                        'camel-case-expansion': false,
                    },
                });
                if (!commandArguments['config-files']) {
                    exports.displayError(new TypeError("Please, provide " + chalk_1.default.cyan('--config-files="./path-to-config-files"')));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, exports.readFiles(commandArguments)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.readArgs = readArgs;
var validateFileContents = function (contents, filePath) {
    if (!contents.outputFilePath) {
        throw new TypeError("Please, provide 'outputFilePath' to " + filePath);
    }
    if (!contents.templateFilePath) {
        throw new TypeError("Please, provide 'templateFilePath' to " + filePath);
    }
};
exports.validateFileContents = validateFileContents;
var readFileContents = function (configFileContents, configFilePath, commandArguments, userAnswers) { return __awaiter(void 0, void 0, void 0, function () {
    var outputFilePath, templateFilePath, _a, template, _b, ask, mergedArguments, inquirerAnswers, outputFilePathTemplate, compiledOutputFilePath, templateFilePathTemplate, compiledTemplateFilePath, templateFileContents, _c, _d, compiledFileContents, baseOutputDir, e_4;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                exports.validateFileContents(configFileContents, configFilePath);
                outputFilePath = configFileContents.outputFilePath, templateFilePath = configFileContents.templateFilePath, _a = configFileContents.template, template = _a === void 0 ? {} : _a, _b = configFileContents.ask, ask = _b === void 0 ? false : _b;
                mergedArguments = __assign(__assign(__assign(__assign({}, template), commandArguments), userAnswers), { ordered: commandArguments._ });
                if (!(ask && Array.isArray(ask))) return [3 /*break*/, 2];
                return [4 /*yield*/, inquirer_1.default.prompt(ask.map(function (argument) { return ({
                        name: argument,
                        default: mergedArguments[argument]
                            ? mergedArguments[argument]
                            : undefined,
                        message: "\u2705 Substitution value for \"" + chalk_1.default.magenta(argument) + "\" ",
                        type: 'input',
                    }); }))];
            case 1:
                inquirerAnswers = _e.sent();
                Object.assign(userAnswers, inquirerAnswers);
                Object.assign(mergedArguments, userAnswers);
                _e.label = 2;
            case 2:
                outputFilePathTemplate = handlebars_1.default.compile(outputFilePath);
                compiledOutputFilePath = outputFilePathTemplate(mergedArguments);
                templateFilePathTemplate = handlebars_1.default.compile(templateFilePath);
                compiledTemplateFilePath = templateFilePathTemplate(mergedArguments);
                _d = (_c = handlebars_1.default).compile;
                return [4 /*yield*/, fs_1.promises.readFile(compiledTemplateFilePath, {
                        encoding: 'utf-8',
                    })];
            case 3:
                templateFileContents = _d.apply(_c, [_e.sent()]);
                compiledFileContents = templateFileContents(mergedArguments);
                baseOutputDir = path_1.dirname(compiledOutputFilePath);
                if (!!fs_1.existsSync(baseOutputDir)) return [3 /*break*/, 5];
                return [4 /*yield*/, fs_1.promises.mkdir(baseOutputDir)];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                _e.trys.push([5, 7, , 9]);
                return [4 /*yield*/, fs_1.promises.writeFile(compiledOutputFilePath, compiledFileContents, {
                        encoding: 'utf-8',
                    })];
            case 6:
                _e.sent();
                console.log(chalk_1.default.green("\n\uD83C\uDD97 File \"" + chalk_1.default.cyan(compiledOutputFilePath) + "\" written successfully.\n"));
                return [3 /*break*/, 9];
            case 7:
                e_4 = _e.sent();
                return [4 /*yield*/, exports.displayError(e_4)];
            case 8:
                _e.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.readFileContents = readFileContents;
var displayError = function (error) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.error(chalk_1.default.bold.red("\n\uD83D\uDEA8 An error \"" + error.name + "\" happened:\n"));
        console.error(chalk_1.default.red('🚨 Error name:\n'), chalk_1.default.yellow(error.name), '\n');
        console.error(chalk_1.default.red('🚨 Error message:\n'), chalk_1.default.yellow(error.message), '\n');
        console.error(chalk_1.default.red('🚨 Error stack:\n'), chalk_1.default.yellow(error.stack), '\n');
        console.log();
        return [2 /*return*/];
    });
}); };
exports.displayError = displayError;
var run = function () {
    if (process.env.NODE_ENV !== 'test') {
        console.log(chalk_1.default.green('\n🆗 Files from template started creating your files...\n'));
        exports.readArgs()
            .then(function () {
            console.log(chalk_1.default.green('\n✅ Files from template has done its job 🥳 🤓\n'));
        })
            .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.displayError(e)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
};
exports.run = run;
exports.run();
