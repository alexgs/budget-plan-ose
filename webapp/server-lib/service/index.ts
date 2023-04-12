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
import { processCreditCardCharge } from './process-credit-card-charge';
import { processCreditCardPayment } from './process-credit-card-payment';
import { processTransaction } from './process-transaction';
import { processPayment } from './process-payment';
import { saveExtantTransaction } from './save-extant-transaction';
import { saveNewTransaction } from './save-new-transaction';
import { saveTransaction } from './save-transaction';
import { updateCategory } from './update-category';
import { validateTxnPayload } from './validate-txn-payload';

export const service = {
  createAccount,
  createCategory,
  getAccountType,
  getAllTransactions,
  getPublicAccounts,
  getPublicCategories,
  getReservationCategoryId,
  processTransaction,
  updateCategory,
  validateTxnPayload,

  /** @private */ ensureDefaultChildCategory,
  /** @private */ ensureSystemAccounts,
  /** @private */ ensureSystemCategories,
  /** @private */ processAccountTransfer,
  /** @private */ processCategoryTransfer,
  /** @private */ processCreditCardCharge,
  /** @private */ processCreditCardPayment,
  /** @private */ processPayment,
  /** @private */ saveExtantTransaction,
  /** @private */ saveNewTransaction,
  /** @private */ saveTransaction,
};
