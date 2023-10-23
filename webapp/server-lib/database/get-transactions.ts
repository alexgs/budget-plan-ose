/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { DbSchema } from '../../shared-lib/schema-v2/database-schema';

export async function getTransactions(
  accountId?: string
): Promise<DbSchema.Transaction[]> {
  if (accountId) {
    return prisma.transactionRecord.findMany({
      include: { accounts: true, categories: true },
      where: { accounts: { some: { accountId } } },
      orderBy: [{ date: 'desc' }, { order: 'desc' }], // Newest transaction at the top
    });
  }

  return prisma.transactionRecord.findMany({
    include: { accounts: true, categories: true },
    orderBy: [{ date: 'desc' }, { order: 'desc' }], // Newest transaction at the top
  });
}
