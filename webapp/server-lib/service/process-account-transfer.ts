/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  ACCOUNT_TYPES,
  SYSTEM_IDS,
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

/**
 * Determines the category IDs for a pair of transaction amounts. Returns an
 * array of category IDs corresponding to the input accounts. That is, result[0]
 * is the category ID for amounts[0], and same for index 1.
 */
async function determineCategoryIds(
  amounts: Amount[],
  isCreditCardPayment: boolean
): Promise<string[]> {
  if (isCreditCardPayment) {
    const accounts = await Promise.all(
      amounts.map(async (amount) => await database.getAccount(amount.accountId))
    );
    const creditCardAccount = accounts[0].accountType === ACCOUNT_TYPES.CREDIT_CARD ? accounts[0] : accounts[1]

    return amounts.map((amount) => {
      if (!amount.isCredit) {
        return service.getReservationCategoryId(creditCardAccount)
      }
      return SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER
    });
  }
  return amounts.map(() => SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER);
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

  // See [ADR 1][1] for an explanation of this logic.
  // [1]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187
  const account0type = await service.getAccountType(amounts[0].accountId);
  const account1type = await service.getAccountType(amounts[1].accountId);
  const isCreditCardPayment =
    (account0type === ACCOUNT_TYPES.CREDIT_CARD &&
      account1type !== ACCOUNT_TYPES.CREDIT_CARD) ||
    (account0type !== ACCOUNT_TYPES.CREDIT_CARD &&
      account1type === ACCOUNT_TYPES.CREDIT_CARD);

  const categoryIds = await determineCategoryIds(amounts, isCreditCardPayment);
  return database.saveTransaction(record, [
    {
      ...amounts[0],
      categoryId: categoryIds[0],
    },
    {
      ...amounts[1],
      categoryId: categoryIds[1],
    },
  ]);
}
