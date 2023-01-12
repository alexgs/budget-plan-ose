/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, SYSTEM_IDS, Transaction } from '../../shared-lib';
import { database } from '../database';

export async function processCategoryTransfer(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  const { amounts, ...record } = payload;

  const finalAmounts = amounts.map((amount) => ({
    ...amount,
    accountId: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER,
  }));

  // TODO There should also be a check for duplicate categories
  const sum = finalAmounts.reduce((output, current) => {
    if (current.isCredit) {
      return output + current.amount;
    }
    return output - current.amount;
  }, 0);
  if (sum !== 0) {
    throw new Error(
      `All of the amounts in a category transfer must sum to $0, but got $${sum} instead.`
    );
  }

  return database.saveTransaction(record, finalAmounts);
}
