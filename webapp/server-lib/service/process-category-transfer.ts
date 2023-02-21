/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  AMOUNT_STATUS,
  SYSTEM_IDS,
  ApiSchema,
  Transaction,
} from '../../shared-lib';
import { database } from '../database';

export async function processCategoryTransfer(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  // Ignore the account that came in with the payload; we'll figure it out ourselves
  const { categories, ...record } = payload;

  // TODO There should also be a check for duplicate categories
  const sum = categories.reduce((output, current) => {
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

  return database.saveTransaction(
    record,
    [
      {
        accountId: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER,
        amount: 0,
        isCredit: false,
        status: AMOUNT_STATUS.CLEARED,
      },
    ],
    categories
  );
}
