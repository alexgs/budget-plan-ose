/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import chalk from 'chalk';
import { format } from 'date-fns';
import * as env from 'env-var';
import path from 'path';
import shell from 'shelljs';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const BACKUP_DIR = path.resolve(PROJECT_ROOT, 'backup');

const TEXT = {
  ERROR: chalk.bgWhiteBright.red.bold(' >> ERROR << '),
  INFO: chalk.cyan('-- Info    --'),
  WARNING: chalk.keyword('orange').bold('<< Warning >>'),
};

function getBackupFilename(databaseName: string): string {
  let database = databaseName;
  if (database.startsWith('db_')) {
    database = database.split('_').slice(1).join('-');
  }
  const now = new Date();
  const date = format(now, 'yyyy-MM-dd');
  const time = format(now, 'kk-mm-ss');
  return `${database}_${date}_${time}.sql`;
}

async function main() {
  const DATABASE = {
    HOST: env.get('DATABASE_HOST').required().asString(),
    NAME: env.get('DATABASE_NAME').required().asString(),
    PASSWORD: env.get('DATABASE_PASSWORD').required().asString(),
    PORT: env.get('DATABASE_PORT').required().asPortNumber(),
    USER: env.get('DATABASE_USER').required().asString(),
  };
  console.log(TEXT.INFO, `Initiating backup of database ${DATABASE.NAME}.`);

  shell.mkdir('-p', BACKUP_DIR);
  const filename = getBackupFilename(DATABASE.NAME);
  const outputPath = path.join(BACKUP_DIR, filename);
  const backup =
    `PGPASSWORD=${DATABASE.PASSWORD} pg_dump --host=${DATABASE.HOST} ` +
    `-p ${DATABASE.PORT} -U ${DATABASE.USER} -w ${DATABASE.NAME} ` +
    `> ${outputPath}`;
  shell.exec(backup);

  console.log(TEXT.INFO, `Backup saved to ${outputPath}.`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error.message);
    process.exit(1);
  });
