/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  ACCOUNT_TYPES,
  SYSTEM_IDS,
  Account,
  ApiSchema,
  Transaction,
} from '../../shared-lib';
import { database } from '../database';
import { service } from './index';

// This interface is just the type as inferred from the Yup schema
interface Amount {
  notes?: string | undefined;
  accountId: string;
  amount: number;
  categoryId: string;
  isCredit: NonNullable<boolean | undefined>;
  status: string;
}

async function determineCategoryForAmount(
  amount: Amount,
  isCreditCardPayment: boolean
): Promise<string> {
  if (isCreditCardPayment && !amount.isCredit) {
    const account: Account = await database.getAccount(amount.accountId);
    return service.getReservationCategoryId(account);
  }
  return SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER;
}

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

  const account0type = await service.getAccountType(amounts[0].accountId);
  const account1type = await service.getAccountType(amounts[1].accountId);
  const isCreditCardPayment =
    (account0type === ACCOUNT_TYPES.CREDIT_CARD &&
      account1type !== ACCOUNT_TYPES.CREDIT_CARD) ||
    (account0type !== ACCOUNT_TYPES.CREDIT_CARD &&
      account1type === ACCOUNT_TYPES.CREDIT_CARD);

  return database.saveTransaction(record, [
    {
      ...amounts[0],
      categoryId: await determineCategoryForAmount(amounts[0], isCreditCardPayment),
    },
    {
      ...amounts[1],
      categoryId: await determineCategoryForAmount(amounts[1], isCreditCardPayment),
    }
  ]);
}
