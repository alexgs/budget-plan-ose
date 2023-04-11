/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { service } from './index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function processPayment(
  payload: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
): Promise<Transaction> {
  const { accounts, categories, ...record } = payload;
  // TODO Check that the sum of the account subrecords equals the sum of
  //   the category subrecords
  return service.saveNewTransaction(record, accounts, categories);
}
