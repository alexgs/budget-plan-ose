/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { newAccount } from './new-account';
import { newCategory } from './new-category';
import { newTransaction } from './new-transaction';
import { patchCategory } from './patch-category';
import { putTransaction } from './put-transaction';
import { accountSubrecord } from './account-subrecord';
import { categorySubrecord } from './category-subrecord';

export const schemaObjects = {
  newAccount,
  newCategory,
  newTransaction,
  patchCategory,
  putTransaction,
  transactionAccount: accountSubrecord,
  transactionCategory: categorySubrecord,
};
