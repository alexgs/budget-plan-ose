/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { DbSchema } from '../../shared-lib/schema-v2/database-schema';

export async function createTransaction(
  txn: DbSchema.NewTransaction
): Promise<DbSchema.Transaction> {
  return prisma.transactionRecord.create({
    data: txn,
    include: {
      accounts: true,
      categories: true,
    },
  });
}
