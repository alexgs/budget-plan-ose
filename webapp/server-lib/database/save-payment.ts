/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TransactionAmount, TransactionRecord } from '@prisma/client';

import { prisma } from '../index';
import { SchemaTypes } from '../../shared-lib';

type SchemaTransactionRecord = Omit<SchemaTypes.NewTransaction, 'amounts'>;

export async function savePayment(
  record: SchemaTransactionRecord,
  amounts: SchemaTypes.TransactionAmount[]
): Promise<TransactionRecord & { amounts: TransactionAmount[] }> {
  // TODO All of the DB updates in here should be wrapped in a single DB transaction

  // Update category balance for each amount
  await Promise.all(
    amounts.map((amount) => {
      const operation = amount.isCredit ? 'increment' : 'decrement';
      return prisma.category.update({
        where: { id: amount.categoryId },
        data: {
          balance: { [operation]: amount.amount },
        },
      });
    })
  );

  // Create the transaction record and amount(s)
  return  prisma.transactionRecord.create({
    data: {
      ...record,
      amounts: {
        createMany: {
          data: amounts,
        },
      },
    },
    include: { amounts: true },
  });
}
