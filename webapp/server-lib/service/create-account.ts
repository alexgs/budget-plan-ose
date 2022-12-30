/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES, SchemaTypes } from '../../shared-lib';
import { database } from '../database';
import { ensureSystemAccounts } from './ensure-system-accounts';

export async function createAccount(payload: SchemaTypes.NewAccount) {
  await ensureSystemAccounts();

  if (payload.accountType === ACCOUNT_TYPES.CREDIT_CARD) {
    await database.createCategory({
      name: `Payments for "${payload.description}" card`,
      isSystem: true,
    });
  }
  return database.createAccount(payload);
}
