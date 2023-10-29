/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import {
  Prisma,
  TransactionAccount,
  TransactionCategory,
  TransactionRecord
} from '@prisma/client';

export namespace DbSchema {
  export type NewAccount = Prisma.FinancialAccountCreateInput;
  export type NewAccountSubrecord = Prisma.TransactionAccountCreateInput;
  export type NewCategory = Prisma.XOR<
    Prisma.CategoryCreateInput,
    Prisma.CategoryUncheckedCreateInput
  >;
  export type NewCategorySubrecord = Prisma.TransactionCategoryCreateInput;
  export type NewTransaction = Prisma.TransactionRecordCreateInput;

  export type Account = TransactionAccount;
  export type Category = TransactionCategory;
  export type Transaction = TransactionRecord & {
    accounts: Account[];
    categories: Category[];
  }
}
