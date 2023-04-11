/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES, ApiSchema, Transaction } from '../../shared-lib';
import { database } from '../database';
import { service } from './index';

async function determineCategoryId(
  accountSubrecords: ApiSchema.NewAccountSubrecord[]
): Promise<string> {
  const accounts = await Promise.all(
    accountSubrecords.map(
      async (subrecord) => await database.getAccount(subrecord.accountId)
    )
  );
  const creditCardAccount =
    accounts[0].accountType === ACCOUNT_TYPES.CREDIT_CARD
      ? accounts[0]
      : accounts[1];
  return service.getReservationCategoryId(creditCardAccount);
}

export async function processCreditCardPayment(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  // The payload contains zero category subrecords
  const { accounts, ...record } = payload;

  if (accounts[0].isCredit === accounts[1].isCredit) {
    throw new Error(
      `One amount must be a credit and the other amount must be a debit.`
    );
  }
  if (accounts[0].amount !== accounts[1].amount) {
    throw new Error(`Credit and debit amounts must be the same.`);
  }

  // See [ADR 1][1] for an explanation of this logic.
  // [1]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187
  const categoryId = await determineCategoryId(accounts);
  return service.saveNewTransaction(record, accounts, [
    {
      categoryId,
      amount: accounts[0].amount,
      isCredit: false,
    },
  ]);
}
