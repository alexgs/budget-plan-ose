/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { Schema } from '../../shared-lib/types';

import { ensureSystemCategories } from './ensure-system-categories';

export async function createCategory(payload: Schema.NewCategory) {
  await ensureSystemCategories();
  return prisma.category.create({
    data: payload,
  });
}
