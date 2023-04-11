/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib';
import { prisma } from '../index';

export async function saveNewAccountSubrecord(
  recordId: string,
  accountSubrecord: ApiSchema.NewAccountSubrecord
): Promise<void> {
  const operation = accountSubrecord.isCredit ? 'increment' : 'decrement';
  await prisma.$transaction([
    prisma.financialAccount.update({
      where: { id: accountSubrecord.accountId },
      data: {
        balance: { [operation]: accountSubrecord.amount },
      },
    }),
    prisma.transactionRecord.update({
      where: { id: recordId },
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
