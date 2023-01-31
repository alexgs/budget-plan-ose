/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { Category, DbSchema } from '../../shared-lib';

export async function createCategory(payload: DbSchema.NewCategory): Promise<Category> {
  return prisma.category.create({
    data: {
      balance: 0,
      ...payload,
    },
  });
}
