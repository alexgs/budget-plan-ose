/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  ACCOUNT_TYPES,
  ApiSchema,
  Transaction,
} from '../../shared-lib';
import { database } from '../database';
import { service } from './index';

async function determineCategoryId(
  accountSubrecords: ApiSchema.NewTransactionAccount[]
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

export async function processAccountTransfer(
  payload: ApiSchema.NewTransaction
): Promise<Transaction> {
  // Ignore the category that came in with the payload; we'll figure it out ourselves
  const { accounts, ...record } = payload;

  if (accounts.length !== 2) {
    throw new Error(
      `Expected \`payload.amounts.length\` to be 2 but got ${accounts.length} instead.`
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

  // See [ADR 1][1] for an explanation of this logic.
  // [1]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187
  const account0type = await service.getAccountType(accounts[0].accountId);
  const account1type = await service.getAccountType(accounts[1].accountId);
  const isCreditCardPayment =
    (account0type === ACCOUNT_TYPES.CREDIT_CARD &&
      account1type !== ACCOUNT_TYPES.CREDIT_CARD) ||
    (account0type !== ACCOUNT_TYPES.CREDIT_CARD &&
      account1type === ACCOUNT_TYPES.CREDIT_CARD);

  if (isCreditCardPayment) {
    const categoryId = await determineCategoryId(accounts);
    return database.saveTransaction(record, accounts, [
      {
        categoryId,
        amount: accounts[0].amount,
        isCredit: false,
      },
    ]);
  }

  return database.saveTransaction(record, accounts, []);
}
