/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Account } from '../../shared-lib';
import { prisma } from '../index';

export async function getAccount(id: string): Promise<Account> {
  return prisma.financialAccount.findFirstOrThrow({ where: { id } });
}
