/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */


import { createAccount } from './create-account';
import { createCategory } from './create-category';
import { getPublicAccounts } from './get-public-accounts';
import { getPublicCategories } from './get-public-categories';

export const database = {
  createAccount,
  createCategory,
  getPublicAccounts,
  getPublicCategories,
};
