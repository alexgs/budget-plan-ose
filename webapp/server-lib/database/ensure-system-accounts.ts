/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES, SYSTEM_IDS } from '../../shared-lib';
import { prisma } from '../index';

export async function ensureSystemAccounts() {
  await ensureCategoryTransferAccount();
}

async function ensureCategoryTransferAccount() {
  const count = await prisma.financialAccount.count({
    where: { id: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER },
  });
  if (count !== 1) {
    await prisma.financialAccount.create({
      data: {
        accountType: ACCOUNT_TYPES.OTHER,
        description: 'Category transfers',
        id: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER,
        isSystem: true,
      },
    });
  }
}
