/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib';
import { prisma } from '../index';

export async function saveNewCategorySubrecord(
  recordId: string,
  categorySubrecord: ApiSchema.NewCategorySubrecord,
): Promise<void> {
  const operation = categorySubrecord.isCredit ? 'increment' : 'decrement';
  await prisma.$transaction([
    prisma.category.update({
      where: { id: categorySubrecord.categoryId },
      data: {
        balance: { [operation]: categorySubrecord.amount },
      },
    }),
    prisma.transactionRecord.update({
      where: { id: recordId },
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
