/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function saveTransaction(
  record: ApiSchema.NewTransactionRecord,
  accounts: ApiSchema.NewTransactionAccount[],
  categories: ApiSchema.NewTransactionCategory[]
): Promise<Transaction> {
  // TODO All of the DB updates in here should be wrapped in a single DB transaction

  // Update all accounts affected by the transaction
  await Promise.all(
    accounts.map(async (account) => {
      const operation = account.isCredit ? 'increment' : 'decrement';
      return prisma.financialAccount.update({
        where: { id: account.accountId },
        data: {
          balance: { [operation]: account.amount },
        },
      });
    })
  );

  // Update all categories affected by the transaction
  await Promise.all(
    categories.map(async (category) => {
      const operation = category.isCredit ? 'increment' : 'decrement';
      return prisma.category.update({
        where: { id: category.categoryId },
        data: {
          balance: { [operation]: category.amount },
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
          data: accounts,
        },
      },
      categories: {
        createMany: {
          // Sometimes `undefined` `notes` field is `null` in the database, and
          // sometimes it's just empty. This seems to be something that Prisma
          // controls and there's not much we can do to make it consistent.
          // We'll just have to handle the inconsistency as needed.
          data: categories,
        },
      },
    },
    include: {
      accounts: true,
      categories: true,
    },
  });
}
