/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import inquirer from 'inquirer'; // We use an old version of `inquirer` to make it work with TypeScript and `ts-node`
import path from 'path';
import shell from 'shelljs';

import { PROJECT_ROOT, TEXT } from './constants';

async function main() {
  // Parse *.env files
  let envFilesOk = true;
  const devEnvPath = path.join(PROJECT_ROOT, 'develop.env');
  if (!shell.test('-f', devEnvPath)) {
    envFilesOk = false;
    console.log(TEXT.ERROR, `Missing file ${devEnvPath}.`);
  }
  const prodEnvPath = path.join(PROJECT_ROOT, 'production.env');
  if (!shell.test('-f', prodEnvPath)) {
    envFilesOk = false;
    console.log(TEXT.ERROR, `Missing file ${prodEnvPath}.`);
  }

  if (!envFilesOk) {
    shell.exit(2);
  }

  const devEnvBuffer = await fs.readFile(devEnvPath);
  const developEnv = dotenv.parse(devEnvBuffer);

  const prodEnvBuffer = await fs.readFile(prodEnvPath);
  const productionEnv = dotenv.parse(prodEnvBuffer);

  // Print instructions to use Flyway first
  console.log(
    TEXT.WARNING,
    'Before running this command, you should run',
    chalk.yellow.bold('task flyway:clean'),
    'and',
    `${chalk.yellow.bold('task flyway:migrate')}.`
  );
  const answer1 = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to continue?',
      default: false,
    },
  ]);

  if (answer1.confirm) {
    // Backup production DB to local temp file
    // Restore local DB from local temp file
    // Delete local temp file
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error.message);
    process.exit(1);
  });
