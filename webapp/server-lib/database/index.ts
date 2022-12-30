/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */


import { createAccount } from './create-account';
import { createCategory } from './create-category';
import { ensureAccount } from './ensure-account';
import { getAccountsExceptIds } from './get-accounts-except-ids';
import { getPublicCategories } from './get-public-categories';

export const database = {
  createAccount,
  createCategory,
  ensureAccount,
  getAccountsExceptIds,
  getPublicCategories,
};
