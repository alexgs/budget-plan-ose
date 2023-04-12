/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  Account,
  ApiSchema,
  Transaction,
  sumSubrecords,
} from '../../shared-lib';
import { database } from '../database';

import { service } from './index';

// See [ADR 1][1] for an explanation of this logic.
// [1]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187

export async function processCreditCardCharge(
  payload: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
): Promise<Transaction> {
  // Payload contains one credit card account subrecord and at least one
  //   category subrecord; we just need to make a reservation to pay off
  //   the charge.
  const { accounts, categories, ...record } = payload;

  // Create a category subrecord for the credit card payment reservation. See
  // [ADR 1][1] for an explanation of this logic.
  // [1]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187
  const account: Account = await database.getAccount(accounts[0].accountId);
  const sum = sumSubrecords(categories);
  const reservationSubrecord: ApiSchema.NewCategorySubrecord = {
    amount: sum,
    categoryId: service.getReservationCategoryId(account),
    isCredit: true,
  };

  return service.saveTransaction({
    ...record,
    accounts,
    categories: [
      ...categories,
      reservationSubrecord,
    ]
  });
}
