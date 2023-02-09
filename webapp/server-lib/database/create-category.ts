/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { Category, DbSchema } from '../../shared-lib';

export async function createCategory(
  payload: DbSchema.NewCategory
): Promise<Category> {
  // Do the assignment like this so TypeScript is happy.
  payload.parentId = payload.parentId?.length ? payload.parentId : undefined;

  return prisma.category.create({
    data: {
      balance: 0,
      ...payload,
    },
  });
}
