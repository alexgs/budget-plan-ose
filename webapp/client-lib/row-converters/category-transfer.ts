/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { TransactionRow } from '../types';
import { getAccountNameIfAvailable } from './get-account-name-if-available';
import { getCategoryNameIfAvailable } from './get-category-name-if-available';

export function categoryTransferRowConverter(
  txn: ModelSchema.Transaction,
  accounts?: ModelSchema.Account[],
  categories?: ModelSchema.Category[],
): TransactionRow {
  const accountSubrecords = txn.accounts.map(
    (account): TransactionRow => ({
      date: '',
      account: getAccountNameIfAvailable(account.accountId, accounts),
      description: '',
      category: '',
      notes: '',
      credit: account.credit,
      debit: account.debit,
    })
  );
  const categorySubrecords = txn.categories.map(
    (category): TransactionRow => ({
      date: '',
      account: '',
      description: '',
      category: getCategoryNameIfAvailable(category.categoryId, categories),
      notes: '',
      credit: category.credit,
      debit: category.debit,
    })
  );
  return {
    account: '',
    credit: 0,
    category: '',
    date: formatClientDate(txn.date),
    debit: 0,
    description: txn.description,
    notes: '',
    subrecords: accountSubrecords.concat(categorySubrecords),
  };
}
