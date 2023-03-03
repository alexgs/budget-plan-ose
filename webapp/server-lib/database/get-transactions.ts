/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';

export async function getTransactions(accountId?: string) {
  return prisma.transactionRecord.findMany({
    include: { accounts: true, categories: true },
    where: { accounts: { some: { accountId } } },
    orderBy: [{ date: 'desc' }, { order: 'desc' }], // Newest transaction at the top
  });
}
