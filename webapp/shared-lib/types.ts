/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { InferType } from 'yup';
import {
  Category as PrismaCategory,
  FinancialAccount,
  Prisma,
  TransactionAmount,
  TransactionRecord
} from '@prisma/client';

import { ACCOUNT_TYPES, TRANSACTION_TYPES } from './constants';
import { schemaObjects } from './schema-objects';

export namespace ApiSchema {
  export type NewAccount = InferType<typeof schemaObjects.newAccount>;
  export type NewCategory = InferType<typeof schemaObjects.newCategory>;
  export type NewTransaction = InferType<typeof schemaObjects.newTransaction>;
  export type NewTransactionAmount = InferType<
    typeof schemaObjects.transactionAmount
  >;
  export type NewTransactionRecord = Omit<NewTransaction, 'amounts'>;
  export type PatchCategory = InferType<typeof schemaObjects.patchCategory>;
}

export namespace DbSchema {
  export type NewAccount = Prisma.FinancialAccountCreateInput;
  export type NewAmount = Prisma.TransactionAmountCreateInput;
  export type NewCategory = Prisma.CategoryCreateInput;
  export type NewRecord = Prisma.TransactionRecordCreateInput;
}

export type Account = FinancialAccount;
export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
export type Category = PrismaCategory;
export type Transaction = TransactionRecord & { amounts: TransactionAmount[] };
export type TransactionType =
  typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
