/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { database } from '../index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function processPayment(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  const { amounts, ...record } = payload;
  return database.saveTransaction(record, amounts);
}
