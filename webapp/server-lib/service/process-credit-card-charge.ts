/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  AMOUNT_STATUS,
  SYSTEM_IDS,
  Account,
  ApiSchema,
  Transaction
} from '../../shared-lib';
import { database } from '../database';

import { service } from './index';

export async function processCreditCardCharge(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  // Txn comes in with credit card account and categories; we just need to make a reservation to pay off the charge
  const { amounts, ...record } = payload;

  // Create the `amount` for the credit card payment reservation
  const account: Account = await database.getAccount(amounts[0].accountId);
  const sum = amounts.reduce((output, current) => output + current.amount, 0);
  const reservationAmount: ApiSchema.NewTransactionAmount = {
    categoryId: service.getReservationCategoryId(account),
    amount: sum,
    accountId: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER,
    isCredit: true,
    status: AMOUNT_STATUS.PENDING,
  };

  return database.saveTransaction(record, [...amounts, reservationAmount]);
}
