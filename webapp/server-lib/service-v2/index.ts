/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { createTransaction } from './create-transaction';
import { fixMissingReservations } from './fix-missing-reservations';
import { fixZeroAccountSubrecords } from './fix-zero-account-subrecords';
import { getAllTransactions } from './get-all-transactions';
import { getPublicAccounts } from './get-public-accounts';
import { getPublicCategories } from './get-public-categories';
import { reconcileAllTransactions } from './reconcile-all-transactions';
import {
  removeExtraCategorySubrecords
} from './remove-extra-category-subrecords';
import { validateTxnPayload } from './validate-txn-payload';

export const service = {
  createTransaction,
  getAllTransactions,
  getPublicAccounts,
  getPublicCategories,
  fixMissingReservations,
  fixZeroAccountSubrecords,
  reconcileAllTransactions,
  removeExtraCategorySubrecords,
  validateTxnPayload
};
