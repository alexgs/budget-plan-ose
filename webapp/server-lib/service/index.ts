/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { createAccount } from './create-account';
import { createCategory } from './create-category';
import { ensureSystemAccounts } from './ensure-system-accounts';
import { ensureSystemCategories } from './ensure-system-categories';
import { getPublicAccounts } from './get-public-accounts';
import { getPublicCategories } from './get-public-categories';
import { processPayment } from './process-payment';

export const service = {
  createAccount,
  createCategory,
  ensureSystemAccounts,
  ensureSystemCategories,
  getPublicAccounts,
  getPublicCategories,
  processPayment,
};
