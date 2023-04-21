/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { newAccount } from './new-account';
import { newAccountSubrecord } from './new-account-subrecord';
import { newCategory } from './new-category';
import { newCategorySubrecord } from './new-category-subrecord';
import { newTransaction } from './new-transaction';
import { updateAccountSubrecord } from './update-account-subrecord';
import { updateCategory } from './update-category';
import { updateCategorySubrecord } from './update-category-subrecord';
import { updateTransaction } from './update-transaction';

export const schemaObjects = {
  newAccount,
  newAccountSubrecord,
  newCategory,
  newCategorySubrecord,
  newTransaction,
  updateAccountSubrecord,
  updateCategory,
  updateCategorySubrecord,
  updateTransaction,
};
