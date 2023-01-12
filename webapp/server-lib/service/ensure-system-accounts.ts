/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES, DbSchema, SYSTEM_IDS } from '../../shared-lib';
import { database } from '../index';

const categoryTransferAccountData: DbSchema.NewAccount = {
  accountType: ACCOUNT_TYPES.OTHER,
  description: 'Category transfers',
  id: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER,
  isSystem: true,
};

export async function ensureSystemAccounts() {
  await database.ensureAccount(categoryTransferAccountData);
}
