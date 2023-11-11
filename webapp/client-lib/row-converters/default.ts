/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { getFriendlyCategoryName } from '../../shared-lib'; // TODO This function should live in `client-lib`
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { getFriendlyAccountName } from '../get-friendly-account-name';
import { TransactionRow } from '../types';

function getAccountNameIfAvailable(
  accountId: string,
  accounts?: ModelSchema.Account[]
) {
  if (!accounts) {
    return '...';
  }

  return getFriendlyAccountName(accounts, accountId);
}

function getCategoryNameIfAvailable(
  categoryId: string,
  categories?: ModelSchema.Category[]
) {
  if (!categories) {
    return '...';
  }

  return getFriendlyCategoryName(categories, categoryId);
}

export default function defaultRowConverter(transaction: ModelSchema.Transaction, accounts?: ModelSchema.Account[], categories?: ModelSchema.Category[]): TransactionRow {
  const accountSubrecords = transaction.accounts.map(
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
  const categorySubrecords = transaction.categories.map(
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
    date: formatClientDate(transaction.date),
    debit: 0,
    description: transaction.description,
    notes: '',
    subrecords: accountSubrecords.concat(categorySubrecords),
  };

}
