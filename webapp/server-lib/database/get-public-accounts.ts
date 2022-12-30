/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { SYSTEM_IDS } from '../../shared-lib';
import { prisma } from '../index';

/**
 * Returns all accounts except those with system IDs
 */
export async function getPublicAccounts() {
  return prisma.financialAccount.findMany({
    where: {
      NOT: [{ id: SYSTEM_IDS.ACCOUNTS.CATEGORY_TRANSFER }],
    },
  });
}
