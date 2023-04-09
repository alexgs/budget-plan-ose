/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function saveTransaction(
  record: ApiSchema.NewTransactionBase,
  accountSubrecords: ApiSchema.NewAccountSubrecord[],
  categorySubrecords: ApiSchema.NewCategorySubrecord[]
): Promise<Transaction> {
  // TODO All of the DB updates in here should be wrapped in a single DB transaction

  // Update all accounts affected by the transaction
  await Promise.all(
    accountSubrecords.map(async (accountSubrecord) => {
      const operation = accountSubrecord.isCredit ? 'increment' : 'decrement';
      return prisma.financialAccount.update({
        where: { id: accountSubrecord.accountId },
        data: {
          balance: { [operation]: accountSubrecord.amount },
        },
      });
    })
  );

  // Update all categories affected by the transaction
  await Promise.all(
    categorySubrecords.map(async (categorySubrecord) => {
      const operation = categorySubrecord.isCredit ? 'increment' : 'decrement';
      return prisma.category.update({
        where: { id: categorySubrecord.categoryId },
        data: {
          balance: { [operation]: categorySubrecord.amount },
        },
      });
    })
  );

  // Create the transaction record and amount(s)
  return prisma.transactionRecord.create({
    data: {
      ...record,
      accounts: {
        createMany: {
          data: accountSubrecords,
        },
      },
      categories: {
        createMany: {
          // Sometimes `undefined` `notes` field is `null` in the database, and
          // sometimes it's just empty. This seems to be something that Prisma
          // controls and there's not much we can do to make it consistent.
          // We'll just have to handle the inconsistency as needed.
          data: categorySubrecords,
        },
      },
    },
    include: {
      accounts: true,
      categories: true,
    },
  });
}
