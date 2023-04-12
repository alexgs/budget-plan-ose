/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Transaction } from '../../shared-lib';
import { prisma } from '../index';

export async function getTransaction(
  transactionId: string
): Promise<Transaction> {
  return prisma.transactionRecord.findUniqueOrThrow({
    where: { id: transactionId },
    include: {
      accounts: true,
      categories: true,
    },
  });
}
