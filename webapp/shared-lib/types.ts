/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { InferType } from 'yup';

import { ACCOUNT_TYPES, TRANSACTION_TYPES } from './constants';
import { schemaObjects } from './schema-objects';

export namespace SchemaTypes {
  export type NewAccount = InferType<typeof schemaObjects.newAccount>;
  export type NewCategory = InferType<typeof schemaObjects.newCategory> & {
    // TODO This might be a code smell. Maybe refactor to have a type based on
    //   the Yup schema and another type based on the Prisma input object. :shrug:
    isSystem?: boolean;
  };
  export type NewTransaction = InferType<typeof schemaObjects.newTransaction>;
  export type TransactionAmount = InferType<
    typeof schemaObjects.transactionAmount
  >;
}

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
export type TransactionType =
  typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
