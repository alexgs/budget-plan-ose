/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { format } from 'date-fns';
import path from 'path';
import shell from 'shelljs';
import { BACKUP_DIR, DATABASE, TEXT } from './constants';

function getBackupFilename(databaseName: string): string {
  let database = databaseName;
  if (database.startsWith('db_')) {
    database = database.split('_').slice(1).join('-');
  }
  const now = new Date();
  const date = format(now, 'yyyy-MM-dd');
  const time = format(now, 'kk-mm-ss');
  return `${database}_${date}_${time}.pgsql`;
}

async function main() {
  console.log(TEXT.INFO, `Initiating backup of database ${DATABASE.NAME}.`);

  shell.mkdir('-p', BACKUP_DIR);
  const filename = getBackupFilename(DATABASE.NAME);
  const outputPath = path.join(BACKUP_DIR, filename);
  const backup =
    `PGPASSWORD=${DATABASE.PASSWORD} pg_dump --host=${DATABASE.HOST} ` +
    `-p ${DATABASE.PORT} -U ${DATABASE.USER} -Fc ${DATABASE.NAME} ` +
    `--schema=public > ${outputPath}`;
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
