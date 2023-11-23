/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { TransactionRow } from '../types';
import { getAccountNameIfAvailable } from './get-account-name-if-available';
import { getCategoryNameIfAvailable } from './get-category-name-if-available';

export function paymentRowConverter(
  txn: ModelSchema.Transaction,
  accounts?: ModelSchema.Account[],
  categories?: ModelSchema.Category[],
): TransactionRow {
  // Valid payment should have an account subrecord and at least 1 category subrecords
  if (txn.accounts.length !== 1 || txn.categories.length < 1) {
    console.log(`Invalid payment transaction: ${txn.id}`);
  }

  if (txn.categories.length === 1) {
    return {
      account: getAccountNameIfAvailable(txn.accounts[0].accountId, accounts),
      category: getCategoryNameIfAvailable(
        txn.categories[0].categoryId,
        categories,
      ),
      credit: txn.categories[0].credit,
      date: formatClientDate(txn.date),
      debit: txn.categories[0].debit,
      description: txn.description,
      notes: txn.categories[0].notes ?? '',
    };
  } else {
    const amounts = txn.categories.reduce((output, current) => {
      output.credit += current.credit;
      output.debit += current.debit;
      return output;
    }, { credit: 0, debit: 0 });

    const categorySubrecords = txn.categories.map(
      (category): TransactionRow => ({
        account: '',
        category: getCategoryNameIfAvailable(category.categoryId, categories),
        credit: category.credit,
        date: '',
        debit: category.debit,
        description: '',
        notes: category.notes ?? '',
      })
    );
    return {
      account: getAccountNameIfAvailable(txn.accounts[0].accountId, accounts),
      category: '',
      credit: amounts.credit,
      date: formatClientDate(txn.date),
      debit: amounts.debit,
      description: txn.description,
      notes: '',
      subrecords: categorySubrecords,
    };

  }
}
