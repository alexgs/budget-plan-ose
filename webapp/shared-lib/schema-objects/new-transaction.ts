/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';
import { TRANSACTION_TYPES } from '../constants';
import { newAccountSubrecord } from './new-account-subrecord';
import { newCategorySubrecord } from './new-category-subrecord';

export const newTransaction = yup.object({
  accounts: yup.array().of(newAccountSubrecord).required(),
  categories: yup.array().of(newCategorySubrecord).required(),
  date: yup.date().required(), // TODO Better client error message for this field
  description: yup.string().required(),
  type: yup.string().oneOf(Object.values(TRANSACTION_TYPES)).required(),
});
