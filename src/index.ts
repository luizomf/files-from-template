#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import { resolve, dirname } from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import handlebars from 'handlebars';
import parser from 'yargs-parser';

const argv = parser(process.argv.slice(2), {
  configuration: {
    'camel-case-expansion': false,
  },
});

const readFiles = async (args: Record<string, any>) => {
  if (!args['config-files']) {
    throw new Error('No path to work with.');
  }

  const path = args['config-files'] as string;

  try {
    const stat = fs.lstatSync(path);
    const rootDir = path;

    if (!stat.isDirectory) {
      throw new Error(`${path} is not a directory`);
    }

    const files = fs.readdirSync(rootDir);
    console.log();

    const answered = {};
    for await (const file of files) {
      if (!file.endsWith('.json')) {
        console.log(chalk.bold.red(file), 'is not a json file. Skipping...');
        continue;
      }

      const filePath = resolve(rootDir, file);

      try {
        const contents = await import(filePath);
        await readFileContents(contents, filePath, args, answered);
      } catch (e) {
        await displayError(e);
      }
    }
  } catch (e) {
    displayError(e);
  }
};

const validateFileContents = (
  contents: Record<string, any>,
  filePath: string,
) => {
  if (!contents.outputFilePath) {
    throw new TypeError(`Please, provide 'outputFilePath' to ${filePath}`);
  }

  if (!contents.templateFilePath) {
    throw new TypeError(`Please, provide 'templateFilePath' to ${filePath}`);
  }
};

const readFileContents = async (
  contents: Record<string, any>,
  filePath: string,
  args: Record<string, any>,
  answered: Record<string, any>,
) => {
  validateFileContents(contents, filePath);

  const {
    outputFilePath,
    templateFilePath,
    template = {},
    ask = false,
  } = contents;

  const mergedArgs = { ...template, ...args, ...answered };

  if (ask && Array.isArray(ask)) {
    const answers = await inquirer.prompt(
      ask.map((arg: string) => ({
        name: arg,
        default: mergedArgs[arg] ? mergedArgs[arg] : undefined,
        message: `Substitution value for "${arg}"`,
        type: 'input',
      })),
    );

    Object.assign(answered, answers);
    Object.assign(mergedArgs, answered);
  }

  const outputFilePathTemplate = handlebars.compile(outputFilePath);
  const compiledOutputFilePath = outputFilePathTemplate(mergedArgs);

  const templateFilePathTemplate = handlebars.compile(templateFilePath);
  const compiledTemplateFilePath = templateFilePathTemplate(mergedArgs);

  const templateFileContents = handlebars.compile(
    fs.readFileSync(compiledTemplateFilePath, {
      encoding: 'utf-8',
    }),
  );

  const compiledFileContents = templateFileContents(mergedArgs);
  const baseOutputDir = dirname(compiledOutputFilePath);

  if (!fs.existsSync(baseOutputDir)) {
    fs.mkdirSync(baseOutputDir);
  }

  try {
    await fs.promises.writeFile(compiledOutputFilePath, compiledFileContents, {
      encoding: 'utf-8',
    });
    console.log(
      chalk.green(`File ${compiledOutputFilePath} written successfully.`),
    );
  } catch (e) {
    await displayError(e);
  }
};

const displayError = async (error: Error) => {
  console.log();
  console.error(chalk.red('Error name:'), error.name);
  console.error(chalk.red('Error message:'), error.message);
  console.error(chalk.red('Error stack:'), error.stack);
  console.log();
};

if (argv['config-files']) {
  readFiles(argv);
} else {
  displayError(
    new Error('Please, provide --config-files="./path-to-config-files"'),
  );
}
