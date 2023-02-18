/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import chalk from 'chalk';
import fs from 'fs/promises';
import inquirer from 'inquirer'; // We use an old version of `inquirer` to make it work with TypeScript and `ts-node`
import path from 'path';
import shell from 'shelljs';

import { BACKUP_DIR, DATABASE, TEXT } from './constants';

async function main() {
  const unfilteredFiles = await fs.readdir(BACKUP_DIR);
  const files = unfilteredFiles.filter((filename) =>
    filename.toLowerCase().endsWith('.pgsql')
  );

  const answer1 = await inquirer.prompt([
    {
      type: 'list',
      name: 'filename',
      message: 'Select a backup file to restore:',
      choices: files,
    },
  ]);
  const backupFile = path.join(BACKUP_DIR, answer1.filename)

  console.log(
    '\nYou are about to overwrite the database',
    chalk.yellow.bold(DATABASE.NAME),
    'on',
    chalk.yellow.bold(DATABASE.HOST),
    'with the data in',
    `${chalk.cyan.bold(backupFile)}.`
  );
  const answer2 = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure?',
      default: false,
    }
  ]);

  if (answer2.confirm) {
    console.log(TEXT.INFO, `Restoring database ${DATABASE.NAME} from ${backupFile}.`);

    const restore =
      `PGPASSWORD=${DATABASE.PASSWORD} pg_restore --host=${DATABASE.HOST} ` +
      `-p ${DATABASE.PORT} -U ${DATABASE.USER} -d ${DATABASE.NAME} ` +
      `-Fc --data-only ${backupFile}`;
    shell.exec(restore);

    console.log(TEXT.INFO, `Database restored.`);
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
