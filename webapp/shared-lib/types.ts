/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { InferType } from 'yup';
import {
  Category as PrismaCategory,
  FinancialAccount,
  Prisma,
  TransactionAccount,
  TransactionCategory,
  TransactionRecord,
} from '@prisma/client';

import { ACCOUNT_TYPES, TRANSACTION_TYPES } from './constants';
import { schemaObjects } from './schema-objects';

export namespace ApiSchema {
  export type NewAccount = InferType<typeof schemaObjects.newAccount>;
  export type NewCategory = InferType<typeof schemaObjects.newCategory>;
  export type NewTransaction = InferType<typeof schemaObjects.newTransaction>;
  export type NewTransactionAccount = InferType<
    typeof schemaObjects.accountSubrecord
  >;
  export type NewTransactionCategory = InferType<
    typeof schemaObjects.categorySubrecord
  >;
  export type NewTransactionRecord = Omit<
    NewTransaction,
    'accounts' | 'categories'
  >;
  export type PatchCategory = InferType<typeof schemaObjects.patchCategory>;
  export type PutTransaction = InferType<typeof schemaObjects.putTransaction>;
  export type Transaction = Omit<TransactionRecord, 'date'> & {
    date: string;
    accounts: TransactionAccount[];
    categories: TransactionCategory[];
  };
}

export namespace DbSchema {
  export type NewAccount = Prisma.FinancialAccountCreateInput;
  export type NewTxnAccount = Prisma.TransactionAccountCreateInput;
  export type NewTxnCategory = Prisma.TransactionCategoryCreateInput;
  export type NewCategory = Prisma.XOR<
    Prisma.CategoryCreateInput,
    Prisma.CategoryUncheckedCreateInput
  >;
  export type NewRecord = Prisma.TransactionRecordCreateInput;
}

export type Account = FinancialAccount;
export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
export type Category = PrismaCategory;
export type Transaction = TransactionRecord & {
  accounts: TransactionAccount[];
  categories: TransactionCategory[];
};
export interface Subrecord {
  amount: number;
  isCredit: boolean;
}
export type TransactionType =
  typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];

