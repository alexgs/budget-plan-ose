/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';
import { TRANSACTION_TYPES } from '../constants';
import { transactionAccount } from './transaction-account';
import { transactionCategory } from './transaction-category';

export const newTransaction = yup.object({
  accounts: yup.array().of(transactionAccount).required(),
  categories: yup.array().of(transactionCategory).required(),
  date: yup.date().required(), // TODO Better client error message for this field
  description: yup.string().required(),
  type: yup.string().oneOf(Object.values(TRANSACTION_TYPES)).required(),
});
