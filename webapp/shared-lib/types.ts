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
  export type NewAccountSubrecord = InferType<
    typeof schemaObjects.newAccountSubrecord
  >;
  export type NewCategorySubrecord = InferType<
    typeof schemaObjects.newCategorySubrecord
  >;
  export type NewTransactionBase = Omit<
    NewTransaction,
    'accounts' | 'categories'
  >;
  export type UpdateAccountSubrecord = InferType<
    typeof schemaObjects.updateAccountSubrecord
  >;
  export type UpdateCategory = InferType<typeof schemaObjects.updateCategory>;
  export type UpdateCategorySubrecord = InferType<
    typeof schemaObjects.updateCategorySubrecord
  >;
  export type UpdateTransactionBase = Omit<
    InferType<typeof schemaObjects.updateTransaction>,
    'accounts' | 'categories'
  >
  export type UpdateTransaction = UpdateTransactionBase & {
    accounts: (NewAccountSubrecord | UpdateAccountSubrecord)[];
    categories: (NewCategorySubrecord | UpdateCategorySubrecord)[];
  };
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
