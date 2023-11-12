/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { TransactionRow } from '../types';
import getAccountNameIfAvailable from './get-account-name-if-available';
import getCategoryNameIfAvailable from './get-category-name-if-available';

export default function creditCardChargeRowConverter(
  txn: ModelSchema.Transaction,
  accounts?: ModelSchema.Account[],
  categories?: ModelSchema.Category[],
): TransactionRow {
  // Valid charge should have an account subrecord and at least 2 category subrecords
  if (
    (txn.accounts.length !== 1 && txn.categories.length < 2) ||
    (txn.accounts[0].credit === 0 && txn.accounts[0].debit === 0)
  ) {
    console.log(`Invalid credit card transaction: ${txn.id}`);
  }

  return {
    account: getAccountNameIfAvailable(txn.accounts[0].accountId, accounts),
    category: getCategoryNameIfAvailable(txn.categories[0].categoryId, categories),
    credit: txn.categories[0].credit,
    date: formatClientDate(txn.date),
    debit: txn.categories[0].debit,
    description: txn.description,
    notes: txn.categories[0].notes ?? '',
  };
}
