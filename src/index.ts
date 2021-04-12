#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import { resolve, dirname } from 'path';
import chalk from 'chalk';
import handlebars from 'handlebars';
import yargs from 'yargs';

const argv = yargs.command<{ configFiles?: string }>(
  'configFiles',
  'Path to the config files',
).argv;

const readFiles = (args: Record<string, any>) => {
  if (!args.configFiles) {
    throw new Error('No path to work with.');
  }

  const path = args.configFiles as string;

  try {
    const stat = fs.lstatSync(path);
    const rootDir = path;

    if (!stat.isDirectory) {
      throw new Error(`${path} is not a directory`);
    }

    const files = fs.readdirSync(rootDir);
    console.log();

    for (const file of files) {
      if (!file.endsWith('.json')) {
        console.log(chalk.bold.red(file), 'is not a json file. Skipping...');
        continue;
      }

      const filePath = resolve(rootDir, file);

      import(filePath)
        .then((contents) => {
          readFileContents(contents, filePath, args);
        })
        .catch((e) => {
          displayError(e);
        });
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

const readFileContents = (
  contents: Record<string, any>,
  filePath: string,
  args: Record<string, any>,
) => {
  validateFileContents(contents, filePath);

  const { outputFilePath, templateFilePath, template = {} } = contents;

  const templateFileContents = handlebars.compile(
    fs.readFileSync(templateFilePath, {
      encoding: 'utf-8',
    }),
  );

  const compiledFileContents = templateFileContents({ ...template, ...args });
  const baseOutputDir = dirname(outputFilePath);

  if (!fs.existsSync(baseOutputDir)) {
    fs.mkdirSync(baseOutputDir);
  }

  fs.writeFile(
    outputFilePath,
    compiledFileContents,
    {
      encoding: 'utf-8',
    },
    (error) => {
      if (error) {
        displayError(error);
      }

      console.log(chalk.green(`File ${outputFilePath} written successfully.`));
    },
  );
};

const displayError = (error: Error) => {
  console.log();
  console.error(chalk.red('Error name:'), error.name);
  console.error(chalk.red('Error message:'), error.message);
  console.error(chalk.red('Error stack:'), error.stack);
  console.log();
};

if (argv?.configFiles) {
  readFiles(argv);
} else {
  displayError(
    new Error('Please, provide --config-files="./path-to-config-files"'),
  );
}
