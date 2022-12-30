/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { SchemaTypes } from '../../shared-lib';

export async function createCategory(payload: SchemaTypes.NewCategory) {
  return prisma.category.create({
    data: payload,
  });
}
