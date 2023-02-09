/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { DbSchema } from '../../shared-lib';
import { prisma } from '../index';

export async function ensureAccount(payload: DbSchema.NewAccount) {
  const count = await prisma.financialAccount.count({
    where: { id: payload.id },
  });
  if (count !== 1) {
    await prisma.financialAccount.create({
      data: payload,
    });
  }
}
