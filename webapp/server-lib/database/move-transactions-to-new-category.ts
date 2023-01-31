/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';

export async function moveTransactionsToNewCategory(
  oldCategoryId: string,
  newCategoryId: string
): Promise<void> {
  await prisma.transactionAmount.updateMany({
    where: { categoryId: oldCategoryId },
    data: { categoryId: newCategoryId },
  });
}
