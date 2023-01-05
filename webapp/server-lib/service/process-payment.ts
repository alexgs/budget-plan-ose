/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TransactionAmount, TransactionRecord } from '@prisma/client';
import { SchemaTypes } from '../../shared-lib';
import { prisma } from '../index';

export async function processPayment(
  payload: SchemaTypes.NewTransaction
): Promise<TransactionRecord & { amounts: TransactionAmount[] }> {

  const { amounts, ...record } = payload;

  // TODO Move all of the DB stuff into the `database` layer
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
