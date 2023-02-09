/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Category } from '../../shared-lib';
import { database } from '../database';

import { service } from './index';

export async function createCategory(
  payload: ApiSchema.NewCategory
): Promise<Category> {
  await service.ensureSystemCategories();

  // If we're creating a child category with zero siblings, then we need to
  // apply special logic before creating the new category. Otherwise, we can
  // just skip to creating the category.

  if (payload.parentId) {
    await service.ensureDefaultChildCategory(payload.parentId);
  }

  return database.createCategory(payload);
}
