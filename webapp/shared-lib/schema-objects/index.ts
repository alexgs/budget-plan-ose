/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { newAccount } from './new-account';
import { newCategory } from './new-category';
import { newTransaction } from './new-transaction';
import { patchCategory } from './patch-category';
import { transactionAmount } from './transaction-amount';

export const schemaObjects = {
  newAccount,
  newCategory,
  newTransaction,
  patchCategory,
  transactionAmount,
};
