/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { countChildCategories } from './count-child-categories';
import { createAccount } from './create-account';
import { createCategory } from './create-category';
import { deleteAccountSubrecord } from './delete-account-subrecord';
import { deleteCategorySubrecord } from './delete-category-subrecord';
import { deleteTransaction } from './delete-transaction';
import { ensureAccount } from './ensure-account';
import { ensureCategory } from './ensure-category';
import { fixCreditCardCharges } from './fix-credit-card-charges';
import { getAccount } from './get-account';
import { getAccountsExceptIds } from './get-accounts-except-ids';
import { getCategoriesExceptIds } from './get-categories-except-ids';
import { getCategory } from './get-category';
import { getTransaction } from './get-transaction';
import { getTransactions } from './get-transactions';
import {
  moveTransactionsToNewCategory
} from './move-transactions-to-new-category';
import { reconcileAllTransactions } from './reconcile-all-transactions';
import { saveNewAccountSubrecord } from './save-new-account-subrecord';
import { saveNewCategorySubrecord } from './save-new-category-subrecord';
import { saveNewTransactionBase } from './save-new-transaction-base';
import { updateAccountSubrecord } from './update-account-subrecord';
import { updateCategory } from './update-category';
import { updateCategoryBalance } from './update-category-balance';
import { updateCategorySubrecord } from './update-category-subrecord';

export const database = {
  countChildCategories,
  createAccount,
  createCategory,
  ensureAccount,
  ensureCategory,
  deleteAccountSubrecord,
  deleteCategorySubrecord,
  deleteTransaction,
  getAccount,
  getAccountsExceptIds,
  getCategoriesExceptIds,
  getCategory,
  getTransaction,
  getTransactions,
  fixCreditCardCharges,
  moveTransactionsToNewCategory,
  reconcileAllTransactions,
  saveNewAccountSubrecord,
  saveNewCategorySubrecord,
  saveNewTransactionBase,
  updateAccountSubrecord,
  updateCategory,
  updateCategoryBalance,
  updateCategorySubrecord,
};
