/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { SYSTEM_IDS } from '../../shared-lib';
import { prisma } from '../index';

export async function ensureSystemCategories() {
  await ensureAccountTransferCategory();
  await ensureCategoryTransferCategory();
}

async function ensureAccountTransferCategory() {
  const count = await prisma.category.count({
    where: { id: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER },
  });
  if (count !== 1) {
    await prisma.category.create({
      data: {
        id: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
        isSystem: true,
        name: 'Account transfers',
      },
    });
  }
}

async function ensureCategoryTransferCategory() {
  const count = await prisma.category.count({
    where: { id: SYSTEM_IDS.CATEGORIES.CATEGORY_TRANSFER },
  });
  if (count !== 1) {
    await prisma.category.create({
      data: {
        id: SYSTEM_IDS.CATEGORIES.CATEGORY_TRANSFER,
        isSystem: true,
        name: 'Category transfers',
      },
    });
  }
}
