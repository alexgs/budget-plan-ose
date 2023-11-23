/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { getReservationCategoryId } from '../../shared-lib/get-reservation-category-id';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { TransactionRow } from '../types';
import { getAccountNameIfAvailable } from './get-account-name-if-available';
import { getCategoryNameIfAvailable } from './get-category-name-if-available';

function lookupReservationCategoryId(
  creditCardAccountId: string,
  accounts?: ModelSchema.Account[]
): string | null {
  if (!accounts) {
    return null;
  }

  const creditCardAccount = accounts.find(
    (account) => account.id === creditCardAccountId
  );
  if (!creditCardAccount) {
    return null;
  }

  return getReservationCategoryId(creditCardAccount);
}

export default function creditCardChargeRowConverter(
  txn: ModelSchema.Transaction,
  accounts?: ModelSchema.Account[],
  categories?: ModelSchema.Category[]
): TransactionRow {
  // Valid charge should have an account subrecord and at least 2 category subrecords
  if (
    (txn.accounts.length !== 1 && txn.categories.length < 2) ||
    (txn.accounts[0].credit === 0 && txn.accounts[0].debit === 0)
  ) {
    console.log(`Invalid credit card transaction: ${txn.id}`);
  }

  // Hide the reservation category
  const reservationCategoryId = lookupReservationCategoryId(
    txn.accounts[0].accountId,
    accounts
  );
  const chargedCategories = txn.categories.filter((cat) => cat.categoryId !== reservationCategoryId);

  if (chargedCategories.length === 1) {
    return {
      account: getAccountNameIfAvailable(txn.accounts[0].accountId, accounts),
      category: getCategoryNameIfAvailable(
        chargedCategories[0].categoryId,
        categories
      ),
      credit: chargedCategories[0].credit,
      date: formatClientDate(txn.date),
      debit: chargedCategories[0].debit,
      description: txn.description,
      notes: chargedCategories[0].notes ?? '',
    };
  } else {
    const categorySubrecords = chargedCategories.map(
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
      credit: 0,
      date: formatClientDate(txn.date),
      debit: 0,
      description: txn.description,
      notes: chargedCategories[0].notes ?? '',
      subrecords: categorySubrecords,
    };
  }
}
