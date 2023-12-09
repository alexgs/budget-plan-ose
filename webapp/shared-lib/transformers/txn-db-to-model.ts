/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { AMOUNT_STATUS } from '../constants';
import { DbSchema } from '../schema-v2/database-schema';
import { ModelSchema } from '../schema-v2/model-schema';
import { TransactionType } from '../types';

function calculateCreditDebit(subrecord: {
  isCredit: boolean;
  amount: number;
}): { credit: number; debit: number } {
  let credit = 0;
  let debit = 0;
  if (subrecord.isCredit) {
    credit = subrecord.amount;
  } else {
    debit = subrecord.amount;
  }
  return { credit, debit };
}

function transformAccounts(
  dbAccounts: DbSchema.Account[]
): ModelSchema.AccountSubrecord[] {
  return dbAccounts.map((account) => {
    const { credit, debit } = calculateCreditDebit(account);
    return {
      credit,
      debit,
      id: account.id,
      accountId: account.accountId,
      recordId: account.recordId,
      status:
        account.status as typeof AMOUNT_STATUS[keyof typeof AMOUNT_STATUS],
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  });
}

function transformCategories(
  dbCategories: DbSchema.Category[]
): ModelSchema.CategorySubrecord[] {
  return dbCategories.map((category) => {
    const { credit, debit } = calculateCreditDebit(category);
    return {
      credit,
      debit,
      id: category.id,
      categoryId: category.categoryId,
      notes: category.notes,
      recordId: category.recordId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  });
}

export function txnDbToModel(
  txn: DbSchema.Transaction
): ModelSchema.Transaction {
  const accounts = transformAccounts(txn.accounts);
  const categories = transformCategories(txn.categories);

  return {
    ...txn,
    accounts,
    categories,
    type: txn.type as TransactionType,
  };
}
