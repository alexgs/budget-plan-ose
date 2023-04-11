/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { ApiSchema, Transaction } from '../../shared-lib';

export async function saveNewTransaction(
  record: ApiSchema.NewTransactionBase,
  accountSubrecords: ApiSchema.NewAccountSubrecord[],
  categorySubrecords: ApiSchema.NewCategorySubrecord[]
): Promise<Transaction> {
  // Create the base record
  const baseRecord = await prisma.transactionRecord.create({
    data: { ...record },
  });

  // Save each account subrecord
  for (let i = 0; i < accountSubrecords.length; i++) {
    const accountSubrecord = accountSubrecords[i];
    const operation = accountSubrecord.isCredit ? 'increment' : 'decrement';
    await prisma.$transaction([
      prisma.financialAccount.update({
        where: { id: accountSubrecord.accountId },
        data: {
          balance: { [operation]: accountSubrecord.amount },
        },
      }),
      prisma.transactionRecord.update({
        where: { id: baseRecord.id },
        data: {
          accounts: {
            createMany: {
              data: accountSubrecord,
            },
          },
        },
      }),
    ]);
  }

  // Save each category subrecord
  for (let i = 0; i < categorySubrecords.length; i++) {
    const categorySubrecord = categorySubrecords[i];
    const operation = categorySubrecord.isCredit ? 'increment' : 'decrement';
    await prisma.$transaction([
      prisma.category.update({
        where: { id: categorySubrecord.categoryId },
        data: {
          balance: { [operation]: categorySubrecord.amount },
        },
      }),
      prisma.transactionRecord.update({
        where: { id: baseRecord.id },
        data: {
          categories: {
            createMany: {
              data: categorySubrecord,
            },
          },
        },
      }),
    ]);
  }

  return prisma.transactionRecord.findUniqueOrThrow({
    where: { id: baseRecord.id },
    include: {
      accounts: true,
      categories: true,
    },
  });
}
