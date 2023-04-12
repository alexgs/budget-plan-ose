/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { service } from './index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function processPayment(
  payload: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
): Promise<Transaction> {
  // TODO Check that the sum of the account subrecords equals the sum of
  //   the category subrecords
  // const { accounts, categories, ...record } = payload;
  return service.saveTransaction(payload);
}
