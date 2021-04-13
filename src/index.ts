#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import { promises as fs, existsSync as fileExists } from 'fs';
import { resolve, dirname } from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import handlebars from 'handlebars';
import parser from 'yargs-parser';

export const readFiles = async (commandArguments: Record<string, any>) => {
  const configFilesPath = `${commandArguments['config-files']}`;

  try {
    const lsStat = await fs.lstat(configFilesPath);
    const rootDirectory = configFilesPath;

    if (!lsStat.isDirectory) {
      throw new Error(`🚨 ${configFilesPath} is not a directory\n`);
    }

    const configFiles = await fs.readdir(rootDirectory);
    console.log();

    const userAnswers = {};
    for await (const configFile of configFiles) {
      if (!configFile.endsWith('.json')) {
        console.log(
          '🚨 ',
          chalk.bold.red(configFile),
          'is not a json file. Skipping...\n',
        );
        continue;
      }

      const configFilePath = resolve(rootDirectory, configFile);

      try {
        const configFileContents = await import(configFilePath);
        await readFileContents(
          configFileContents,
          configFilePath,
          commandArguments,
          userAnswers,
        );
      } catch (e) {
        await displayError(e);
      }
    }
  } catch (e) {
    displayError(e);
  }
};

export const readArgs = async () => {
  const commandArguments = parser(process.argv.slice(2), {
    configuration: {
      'camel-case-expansion': false,
    },
  });

  if (!commandArguments['config-files']) {
    displayError(
      new TypeError(
        `Please, provide ${chalk.cyan(
          '--config-files="./path-to-config-files"',
        )}`,
      ),
    );
    return;
  }

  await readFiles(commandArguments);
};

export const validateFileContents = (
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

export const readFileContents = async (
  configFileContents: Record<string, any>,
  configFilePath: string,
  commandArguments: Record<string, any>,
  userAnswers: Record<string, any>,
) => {
  validateFileContents(configFileContents, configFilePath);

  const {
    outputFilePath,
    templateFilePath,
    template = {},
    ask = false,
  } = configFileContents;

  const mergedArguments = { ...template, ...commandArguments, ...userAnswers };

  if (ask && Array.isArray(ask)) {
    const inquirerAnswers = await inquirer.prompt(
      ask.map((argument: string) => ({
        name: argument,
        default: mergedArguments[argument]
          ? mergedArguments[argument]
          : undefined,
        message: `✅ Substitution value for "${chalk.magenta(argument)}" `,
        type: 'input',
      })),
    );

    Object.assign(userAnswers, inquirerAnswers);
    Object.assign(mergedArguments, userAnswers);
  }

  const outputFilePathTemplate = handlebars.compile(outputFilePath);
  const compiledOutputFilePath = outputFilePathTemplate(mergedArguments);

  const templateFilePathTemplate = handlebars.compile(templateFilePath);
  const compiledTemplateFilePath = templateFilePathTemplate(mergedArguments);

  const templateFileContents = handlebars.compile(
    await fs.readFile(compiledTemplateFilePath, {
      encoding: 'utf-8',
    }),
  );

  const compiledFileContents = templateFileContents(mergedArguments);
  const baseOutputDir = dirname(compiledOutputFilePath);

  if (!fileExists(baseOutputDir)) {
    await fs.mkdir(baseOutputDir);
  }

  try {
    await fs.writeFile(compiledOutputFilePath, compiledFileContents, {
      encoding: 'utf-8',
    });
    console.log(
      chalk.green(
        `\n🆗 File "${chalk.cyan(
          compiledOutputFilePath,
        )}" written successfully.\n`,
      ),
    );
  } catch (e) {
    await displayError(e);
  }
};

export const displayError = async (error: Error) => {
  console.error(chalk.bold.red(`\n🚨 An error "${error.name}" happened:\n`));
  console.error(chalk.red('🚨 Error name:\n'), chalk.yellow(error.name), '\n');
  console.error(
    chalk.red('🚨 Error message:\n'),
    chalk.yellow(error.message),
    '\n',
  );
  console.error(
    chalk.red('🚨 Error stack:\n'),
    chalk.yellow(error.stack),
    '\n',
  );
  console.log();
};

export const run = () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      chalk.green('\n🆗 Files from template started creating your files...\n'),
    );

    readArgs()
      .then(() => {
        console.log(
          chalk.green('\n✅ Files from template has done its job 🥳 🤓\n'),
        );
      })
      .catch(async (e) => {
        await displayError(e);
      });
  }
};

run();
