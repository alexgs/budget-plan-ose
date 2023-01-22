/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { AccountType } from '../../shared-lib';
import { database } from '../database';

export async function getAccountType(accountId: string): Promise<AccountType> {
  const account = await database.getAccount(accountId);
  return account.accountType as AccountType;
}
