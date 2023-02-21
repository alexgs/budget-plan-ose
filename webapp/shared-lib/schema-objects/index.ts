/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { newAccount } from './new-account';
import { newCategory } from './new-category';
import { newTransaction } from './new-transaction';
import { patchCategory } from './patch-category';
import { transactionAccount } from './transaction-account';
import { transactionCategory } from './transaction-category';

export const schemaObjects = {
  newAccount,
  newCategory,
  newTransaction,
  patchCategory,
  transactionAccount,
  transactionCategory,
};
