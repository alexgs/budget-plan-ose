/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { database } from '../index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function processPayment(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  const { accounts, categories, ...record } = payload;
  // TODO Add some validations, like
  //   - there must be at least one account subrecord
  //   - there must be at least one category subrecord
  //   - the sum of the account subrecords must equal the sum of the category subrecord
  return database.saveTransaction(record, accounts, categories);
}
