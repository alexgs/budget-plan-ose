/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { createAccount } from './create-account';
import { createCategory } from './create-category';
import { ensureDefaultChildCategory } from './ensure-default-child-category';
import { ensureSystemAccounts } from './ensure-system-accounts';
import { ensureSystemCategories } from './ensure-system-categories';
import { getAccountType } from './get-account-type';
import { getAllTransactions } from './get-all-transactions';
import { getPublicAccounts } from './get-public-accounts';
import { getPublicCategories } from './get-public-categories';
import { getReservationCategoryId } from './get-reservation-category-id';
import { processAccountTransfer } from './process-account-transfer';
import { processCategoryTransfer } from './process-category-transfer';
import { processCreditCardPayment } from './process-credit-card-payment';
import { processPayment } from './process-payment';
import { processCreditCardCharge } from './process-credit-card-charge';
import { updateCategory } from './update-category';

export const service = {
  createAccount,
  createCategory,
  getAccountType,
  getAllTransactions,
  getPublicAccounts,
  getPublicCategories,
  getReservationCategoryId,
  processAccountTransfer,
  processCategoryTransfer,
  processPayment,
  processCreditCardCharge,
  processCreditCardPayment,
  updateCategory,

  /** @private */ ensureDefaultChildCategory,
  /** @private */ ensureSystemAccounts,
  /** @private */ ensureSystemCategories,
};
