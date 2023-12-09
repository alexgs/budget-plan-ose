/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { FormValues } from '../components/TransactionTableV2/TransactionForm';
import { TRANSACTION_TYPES, getReservationCategoryId } from '../shared-lib';
import { ModelSchema } from '../shared-lib/schema-v2/model-schema';

function getValues(txn: ModelSchema.Transaction): FormValues {
  if (txn.categories.length === 1) {
    return {
      account: txn.accounts[0].accountId,
      categories: [txn.categories[0].categoryId],
      date: txn.date,
      description: txn.description,
      notes: [txn.categories[0].notes ?? ''],
      credit: [txn.categories[0].credit / 100],
      debit: [txn.categories[0].debit / 100],
    };
  } else {
    const creditSum = txn.categories.reduce((acc, c) => acc + c.credit, 0);
    const debitSum = txn.categories.reduce((acc, c) => acc + c.debit, 0);
    return {
      account: txn.accounts[0].accountId,
      categories: ['', ...txn.categories.map((c) => c.categoryId)],
      date: txn.date,
      description: txn.description,
      notes: ['', ...txn.categories.map((c) => c.notes ?? '')],
      credit: [creditSum / 100, ...txn.categories.map((c) => c.credit / 100)],
      debit: [debitSum / 100, ...txn.categories.map((c) => c.debit / 100)],
    };
  }
}

export function getFormValuesFromTxn(
  txn: ModelSchema.Transaction,
  accounts: ModelSchema.Account[]
): FormValues {
  if (txn.type === TRANSACTION_TYPES.PAYMENT) {
    return getValues(txn);
  }

  if (txn.type === TRANSACTION_TYPES.CREDIT_CARD_CHARGE) {
    const account = accounts.find((a) => a.id === txn.accounts[0].accountId);
    if (!account) {
      throw new Error(`Could not find account for transaction ${txn.id}`);
    }
    const reservationCategoryId = getReservationCategoryId(account);
    const chargeCategories = txn.categories.filter(
      (c) => c.categoryId !== reservationCategoryId
    );
    return getValues({
      ...txn,
      categories: chargeCategories,
    });
  }

  throw new Error(
    `Editing is not implemented for transaction type "${txn.type}".`
  );
}
