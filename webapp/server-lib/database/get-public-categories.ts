/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { SYSTEM_IDS } from '../../shared-lib';
import { prisma } from '../index';

/**
 * Returns all categories except those with system IDs
 */
export async function getPublicCategories() {
  return prisma.category.findMany({
    where: {
      NOT: [
        { id: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER },
        { id: SYSTEM_IDS.CATEGORIES.CATEGORY_TRANSFER },
      ],
    },
  });
}
