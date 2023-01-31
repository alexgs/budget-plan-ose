/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { Category } from '../../shared-lib';

export async function getCategory(categoryId: string): Promise<Category> {
  return prisma.category.findFirstOrThrow({ where: { id: categoryId } });
}
