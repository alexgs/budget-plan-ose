/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';

import { newTransaction } from './new-transaction';

export const updateTransaction = newTransaction.concat(
  yup.object({
    accounts: yup.array().required(),
    categories: yup.array().required(),
    id: yup.string().uuid().required(),
  })
);
