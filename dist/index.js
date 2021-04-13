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
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var handlebars_1 = __importDefault(require("handlebars"));
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var argv = yargs_parser_1.default(process.argv.slice(2), {
    configuration: {
        'camel-case-expansion': false,
    },
});
var readFiles = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var path, stat, rootDir, files, answered, files_1, files_1_1, file, filePath, contents, e_1, e_2_1, e_3;
    var e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!args['config-files']) {
                    throw new Error('No path to work with.');
                }
                path = args['config-files'];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 19, , 20]);
                stat = fs_1.default.lstatSync(path);
                rootDir = path;
                if (!stat.isDirectory) {
                    throw new Error(path + " is not a directory");
                }
                files = fs_1.default.readdirSync(rootDir);
                console.log();
                answered = {};
                _b.label = 2;
            case 2:
                _b.trys.push([2, 12, 13, 18]);
                files_1 = __asyncValues(files);
                _b.label = 3;
            case 3: return [4 /*yield*/, files_1.next()];
            case 4:
                if (!(files_1_1 = _b.sent(), !files_1_1.done)) return [3 /*break*/, 11];
                file = files_1_1.value;
                if (!file.endsWith('.json')) {
                    console.log(chalk_1.default.bold.red(file), 'is not a json file. Skipping...');
                    return [3 /*break*/, 10];
                }
                filePath = path_1.resolve(rootDir, file);
                _b.label = 5;
            case 5:
                _b.trys.push([5, 8, , 10]);
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(filePath)); })];
            case 6:
                contents = _b.sent();
                return [4 /*yield*/, readFileContents(contents, filePath, args, answered)];
            case 7:
                _b.sent();
                return [3 /*break*/, 10];
            case 8:
                e_1 = _b.sent();
                return [4 /*yield*/, displayError(e_1)];
            case 9:
                _b.sent();
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 3];
            case 11: return [3 /*break*/, 18];
            case 12:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 18];
            case 13:
                _b.trys.push([13, , 16, 17]);
                if (!(files_1_1 && !files_1_1.done && (_a = files_1.return))) return [3 /*break*/, 15];
                return [4 /*yield*/, _a.call(files_1)];
            case 14:
                _b.sent();
                _b.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 17: return [7 /*endfinally*/];
            case 18: return [3 /*break*/, 20];
            case 19:
                e_3 = _b.sent();
                displayError(e_3);
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/];
        }
    });
}); };
var validateFileContents = function (contents, filePath) {
    if (!contents.outputFilePath) {
        throw new TypeError("Please, provide 'outputFilePath' to " + filePath);
    }
    if (!contents.templateFilePath) {
        throw new TypeError("Please, provide 'templateFilePath' to " + filePath);
    }
};
var readFileContents = function (contents, filePath, args, answered) { return __awaiter(void 0, void 0, void 0, function () {
    var outputFilePath, templateFilePath, _a, template, _b, ask, mergedArgs, answers, outputFilePathTemplate, compiledOutputFilePath, templateFilePathTemplate, compiledTemplateFilePath, templateFileContents, compiledFileContents, baseOutputDir, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                validateFileContents(contents, filePath);
                outputFilePath = contents.outputFilePath, templateFilePath = contents.templateFilePath, _a = contents.template, template = _a === void 0 ? {} : _a, _b = contents.ask, ask = _b === void 0 ? false : _b;
                mergedArgs = __assign(__assign(__assign({}, template), args), answered);
                if (!(ask && Array.isArray(ask))) return [3 /*break*/, 2];
                return [4 /*yield*/, inquirer_1.default.prompt(ask.map(function (arg) { return ({
                        name: arg,
                        default: mergedArgs[arg] ? mergedArgs[arg] : undefined,
                        message: "Substitution value for \"" + arg + "\"",
                        type: 'input',
                    }); }))];
            case 1:
                answers = _c.sent();
                Object.assign(answered, answers);
                Object.assign(mergedArgs, answered);
                _c.label = 2;
            case 2:
                outputFilePathTemplate = handlebars_1.default.compile(outputFilePath);
                compiledOutputFilePath = outputFilePathTemplate(mergedArgs);
                templateFilePathTemplate = handlebars_1.default.compile(templateFilePath);
                compiledTemplateFilePath = templateFilePathTemplate(mergedArgs);
                templateFileContents = handlebars_1.default.compile(fs_1.default.readFileSync(compiledTemplateFilePath, {
                    encoding: 'utf-8',
                }));
                compiledFileContents = templateFileContents(mergedArgs);
                baseOutputDir = path_1.dirname(compiledOutputFilePath);
                if (!fs_1.default.existsSync(baseOutputDir)) {
                    fs_1.default.mkdirSync(baseOutputDir);
                }
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 7]);
                return [4 /*yield*/, fs_1.default.promises.writeFile(compiledOutputFilePath, compiledFileContents, {
                        encoding: 'utf-8',
                    })];
            case 4:
                _c.sent();
                console.log(chalk_1.default.green("File " + compiledOutputFilePath + " written successfully."));
                return [3 /*break*/, 7];
            case 5:
                e_4 = _c.sent();
                return [4 /*yield*/, displayError(e_4)];
            case 6:
                _c.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var displayError = function (error) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log();
        console.error(chalk_1.default.red('Error name:'), error.name);
        console.error(chalk_1.default.red('Error message:'), error.message);
        console.error(chalk_1.default.red('Error stack:'), error.stack);
        console.log();
        return [2 /*return*/];
    });
}); };
if (argv['config-files']) {
    readFiles(argv);
}
else {
    displayError(new Error('Please, provide --config-files="./path-to-config-files"'));
}
