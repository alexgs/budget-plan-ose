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
import { getTransactions } from './get-transactions';
import { saveTransaction } from './save-transaction';

export const database = {
  countChildCategories,
  createAccount,
  createCategory,
  ensureAccount,
  ensureCategory,
  getAccount,
  getAccountsExceptIds,
  getCategoriesExceptIds,
  getTransactions,
  saveTransaction,
};
