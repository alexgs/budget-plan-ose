/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { InferType } from 'yup';
import { ACCOUNT_TYPES, TRANSACTION_TYPES } from './constants';
import { newTransactionSchema } from './new-transaction-schema';
import { schema } from './schema';

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
export type NewCategorySchema = InferType<typeof schema.newCategory>;
export type NewTransactionSchema = InferType<typeof newTransactionSchema>;
export type TransactionType =
  typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
