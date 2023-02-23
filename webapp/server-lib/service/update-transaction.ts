/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Transaction } from '../../shared-lib';
import { database } from '../database';

export async function updateTransaction(
  payload: ApiSchema.PutTransaction
): Promise<Transaction> {
  // Delete the old transaction
  await database.deleteTransaction(payload.id);

  // Save the new transaction
  const { accounts, categories, ...record } = payload;
  // TODO Check that the sum of the account subrecords equals the sum of
  //   the category subrecords
  const output = await database.saveTransaction(record, accounts, categories);

  // Reconcile accounts and categories
  // TODO Consider reconciling only impacted accounts and categories
  await database.reconcileAllTransactions();

  return output;
}
