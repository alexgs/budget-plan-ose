/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Transaction } from '../../shared-lib';
import { service } from './index';

export async function processAccountTransfer(
  payload: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
): Promise<Transaction> {
  // The payload contains zero category subrecords
  const { accounts, ...record } = payload;

  if (accounts.length !== 2) {
    throw new Error(
      'Account transfer must contain exactly two account subrecords.'
    );
  }
  if (accounts[0].isCredit === accounts[1].isCredit) {
    throw new Error(
      `One amount must be a credit and the other amount must be a debit.`
    );
  }
  if (accounts[0].amount !== accounts[1].amount) {
    throw new Error(`Credit and debit amounts must be the same.`);
  }

  return service.saveNewTransaction(record, accounts, []);
}
