/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';

export function getCategoriesExceptIds(excludeIds: string[]) {
  const notClause = excludeIds.map((id) => ({ id }))
  return prisma.category.findMany({
    where: {
      NOT: notClause,
    },
  });
}
