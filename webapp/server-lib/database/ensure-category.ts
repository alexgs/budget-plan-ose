/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { DbSchema } from '../../shared-lib';
import { prisma } from '../index';

export async function ensureCategory(data: DbSchema.NewCategory) {
  const count = await prisma.category.count({
    where: { id: data.id },
  });
  if (count !== 1) {
    await prisma.category.create({ data });
  }
}
