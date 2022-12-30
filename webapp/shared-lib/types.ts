/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { InferType } from 'yup';
import { ACCOUNT_TYPES, TRANSACTION_TYPES } from './constants';
import { schema } from './schema';

export namespace Schema {
  export type NewCategory = InferType<typeof schema.newCategory>;
  export type NewTransaction = InferType<typeof schema.newTransaction>;
}

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
export type TransactionType =
  typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
