/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Schema } from '../../shared-lib/types';
import { prisma } from '../index';

export async function createAccount(payload: Schema.NewAccount) {
  return prisma.financialAccount.create({
    data: payload,
  })
}
