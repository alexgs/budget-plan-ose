/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES, SYSTEM_IDS } from '../../shared-lib';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { database } from '../database';

export async function getPublicAccounts(): Promise<ModelSchema.Account[]> {
  const accounts = await database.getAccountsExceptIds([SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER]);
  return accounts.map((account): ModelSchema.Account => ({
    ...account,
    accountType: account.accountType as typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES],
    order: null,
  }));
}
