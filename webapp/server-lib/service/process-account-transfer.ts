/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, SYSTEM_IDS, Transaction } from '../../shared-lib';
import { database } from '../database';

export async function processAccountTransfer(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  const { amounts, ...record } = payload;

  if (amounts.length !== 2) {
    throw new Error(
      `Expected \`payload.amounts.length\` to be 2 but got ${amounts.length} instead.`
    );
  }
  if (amounts[0].isCredit === amounts[1].isCredit) {
    throw new Error(
      `One amount must be a credit and the other amount must be a debit.`
    );
  }
  if (amounts[0].amount !== amounts[1].amount) {
    throw new Error(`Credit and debit amounts must be the same.`);
  }

  return database.saveTransaction(record, [
    {
      ...amounts[0],
      categoryId: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
    },
    {
      ...amounts[1],
      categoryId: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
    }
  ]);
}
