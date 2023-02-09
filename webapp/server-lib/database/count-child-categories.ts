/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';

export async function countChildCategories(
  categoryId: string
): Promise<number> {
  return prisma.category.count({ where: { parentId: categoryId } });
}
