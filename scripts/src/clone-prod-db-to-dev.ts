/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import inquirer from 'inquirer'; // We use an old version of `inquirer` to make it work with TypeScript and `ts-node`
import path from 'path';
import shell from 'shelljs';

import { DATABASE, PROJECT_ROOT, TEXT } from './constants';

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
    const tempFile = path.join(shell.tempdir(), `budget-plan-${Date.now()}.pgsql`);

    // Backup production DB to local temp file
    console.log(TEXT.INFO, 'Downloading data from production database.');
    const backup =
      `PGPASSWORD=${productionEnv.DATABASE_PASSWORD} pg_dump --host=${productionEnv.DATABASE_HOST} ` +
      `-p ${productionEnv.DATABASE_PORT} -U ${productionEnv.DATABASE_USER} -Fc ${productionEnv.DATABASE_NAME} ` +
      `--schema=public > ${tempFile}`;
    shell.exec(backup);

    // Restore local DB from local temp file
    console.log(TEXT.INFO, 'Copying data into local database.');
    const restore =
      `PGPASSWORD=${developEnv.DATABASE_PASSWORD} pg_restore --host=${developEnv.DATABASE_HOST} ` +
      `-p ${developEnv.DATABASE_PORT} -U ${developEnv.DATABASE_USER} -d ${developEnv.DATABASE_NAME} ` +
      `-Fc --data-only ${tempFile}`;
    shell.exec(restore);

    // Delete local temp file
    shell.rm(tempFile);
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
