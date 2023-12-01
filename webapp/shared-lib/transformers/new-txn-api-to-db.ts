/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { AMOUNT_STATUS } from '../constants';
import { ApiSchema } from '../schema-v2/api-schema';
import { DbSchema } from '../schema-v2/database-schema';
import { Prisma } from '.prisma/client';

export function newTxnApiToDb(
  txn: ApiSchema.NewTransaction
): DbSchema.NewTransaction {
  const accounts: DbSchema.NewAccountSubrecord[] = txn.accounts.map(
    (account) => {
      const isCredit = account.credit > 0;
      const amount = isCredit ? account.credit : account.debit;
      return {
        amount,
        isCredit,
        account: {
          connect: {
            id: account.accountId,
          },
        },
        accountId: account.accountId,
        status: AMOUNT_STATUS.PENDING,
      };
    }
  );

  const categories: DbSchema.NewCategorySubrecord[] = txn.categories.map(
    (category) => {
      const isCredit = category.credit > 0;
      const amount = isCredit ? category.credit : category.debit;
      return {
        amount,
        isCredit,
        category: {
          connect: {
            id: category.categoryId,
          },
        },
        categoryId: category.categoryId,
      };
    }
  );

  return {
    ...txn,
    accounts: {
      createMany: {
        data: accounts,
      },
    },
    categories: {
      createMany: {
        data: categories,
      },
    },
  };
}
