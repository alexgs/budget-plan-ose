/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import fs from 'fs/promises';
import inquirer from 'inquirer'; // We use an old version of `inquirer` to make it work with TypeScript and `ts-node`

import { BACKUP_DIR } from './constants';

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
  console.log('\nYour answer:');
  console.log(answer1.filename);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error.message);
    process.exit(1);
  });
