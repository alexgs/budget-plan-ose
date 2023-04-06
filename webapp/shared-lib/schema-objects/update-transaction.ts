/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';

import { newAccountSubrecord } from './new-account-subrecord';
import { newCategorySubrecord } from './new-category-subrecord';
import { newTransaction } from './new-transaction';
import { updateAccountSubrecord } from './update-account-subrecord';
import { updateCategorySubrecord } from './update-category-subrecord';

export const updateTransaction = newTransaction.concat(
  yup.object({
    accounts: yup
      .array()
      .of(yup.object().oneOf([newAccountSubrecord, updateAccountSubrecord]))
      .required(),
    categories: yup
      .array()
      .of(yup.object().oneOf([newCategorySubrecord, updateCategorySubrecord]))
      .required(),
    id: yup.string().uuid().required(),
  })
);
