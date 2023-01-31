/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { Category } from '../../shared-lib';

/**
 * Normally, category balances are updated by calling `saveTransaction`, but
 * there are some cases where we need to change them directly. That's what this
 * function is for.
 */
export async function updateCategoryBalance(
  categoryId: string,
  newBalanceInCents: number | null
): Promise<Category> {
  return prisma.category.update({
    where: { id: categoryId },
    data: { balance: newBalanceInCents },
  });
}
