/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { fixCreditCardCharges } from './fix-credit-card-charges';
import { getAllTransactions } from './get-all-transactions';
import { getPublicAccounts } from './get-public-accounts';
import { getPublicCategories } from './get-public-categories';
import { reconcileAllTransactions } from './reconcile-all-transactions';

export const service = {
  getAllTransactions,
  getPublicAccounts,
  getPublicCategories,
  fixCreditCardCharges,
  reconcileAllTransactions,
};
