/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Transaction } from '../../shared-lib';
import { prisma } from '../index';

export async function saveNewTransactionBase(
  base: ApiSchema.NewTransactionBase
): Promise<Transaction> {
  return prisma.transactionRecord.create({
    data: { ...base },
    include: {
      accounts: true,
      categories: true,
    },
  });
}
