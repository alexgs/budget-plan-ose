/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import chalk from 'chalk';
import * as env from 'env-var';
import path from 'path';

export const PROJECT_ROOT = path.resolve(__dirname, '../..');
export const BACKUP_DIR = path.resolve(PROJECT_ROOT, 'backup');

export const DATABASE = {
  HOST: env.get('DATABASE_HOST').required().asString(),
  NAME: env.get('DATABASE_NAME').required().asString(),
  PASSWORD: env.get('DATABASE_PASSWORD').required().asString(),
  PORT: env.get('DATABASE_PORT').required().asPortNumber(),
  USER: env.get('DATABASE_USER').required().asString(),
};

export const TEXT = {
  ERROR: chalk.bgWhiteBright.red.bold(' >> ERROR << '),
  INFO: chalk.cyan('-- Info    --'),
  WARNING: chalk.keyword('orange').bold('<< Warning >>'),
};

