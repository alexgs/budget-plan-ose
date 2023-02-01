/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../../server-lib';
import { ApiSchema, Category } from '../../shared-lib';

export async function updateCategory(
  categoryId: string,
  payload: ApiSchema.PatchCategory
): Promise<Category> {
  return prisma.category.update({
    where: { id: categoryId },
    data: {
      name: payload.name,
      parentId: payload.parentId,
    },
  });
}
