/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';

interface CategoryData {
  id: string;
  isSystem?: boolean;
  name: string;
}

export async function ensureCategory(data: CategoryData) {
  const count = await prisma.category.count({
    where: { id: data.id },
  });
  if (count !== 1) {
    await prisma.category.create({ data });
  }
}
