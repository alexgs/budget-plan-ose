/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { ApiSchema, Category } from '../../shared-lib';

export async function createCategory(payload: ApiSchema.NewCategory): Promise<Category> {
  return prisma.category.create({
    data: {
      balance: 0,
      ...payload,
      parentId: payload.parentId?.length ? payload.parentId : undefined,
    },
  });
}
