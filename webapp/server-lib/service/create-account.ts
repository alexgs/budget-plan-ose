/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES, ApiSchema } from '../../shared-lib';
import { database } from '../database';

import { service } from './index';

export async function createAccount(payload: ApiSchema.NewAccount) {
  await service.ensureSystemAccounts();

  const account = await database.createAccount(payload);
  if (payload.accountType === ACCOUNT_TYPES.CREDIT_CARD) {
    await database.createCategory({
      id: service.getReservationCategoryId(account),
      name: `Payments for "${payload.description}" card`,
      isSystem: true,
    });
  }

  return account;
}
