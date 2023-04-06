/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { database } from '../database';
import { ApiSchema, Category } from '../../shared-lib';

import { service } from './index';

export async function updateCategory(
  categoryId: string,
  payload: ApiSchema.UpdateCategory
): Promise<Category> {
  const currentCategory = await database.getCategory(categoryId);
  const isNewParent = currentCategory.parentId !== payload.parentId;

  // Look to see if we're changing the parent category to non-null value
  if (payload.parentId && isNewParent) {
    await service.ensureDefaultChildCategory(payload.parentId);
  }

  return database.updateCategory(categoryId, payload);
}
