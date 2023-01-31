/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { countChildCategories } from './count-child-categories';
import { createAccount } from './create-account';
import { createCategory } from './create-category';
import { ensureAccount } from './ensure-account';
import { ensureCategory } from './ensure-category';
import { getAccount } from './get-account';
import { getAccountsExceptIds } from './get-accounts-except-ids';
import { getCategoriesExceptIds } from './get-categories-except-ids';
import { getCategory } from './get-category';
import { getTransactions } from './get-transactions';
import {
  moveTransactionsToNewCategory
} from './move-transactions-to-new-category';
import { saveTransaction } from './save-transaction';
import { updateCategoryBalance } from './update-category-balance';

export const database = {
  countChildCategories,
  createAccount,
  createCategory,
  ensureAccount,
  ensureCategory,
  getAccount,
  getAccountsExceptIds,
  getCategoriesExceptIds,
  getCategory,
  getTransactions,
  moveTransactionsToNewCategory,
  saveTransaction,
  updateCategoryBalance,
};
