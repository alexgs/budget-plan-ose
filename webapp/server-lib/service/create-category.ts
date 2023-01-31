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
    const numSiblingCategories = await database.countChildCategories(
      payload.parentId
    );
    if (numSiblingCategories === 0) {
      // (A) Create a sibling category called "Misc."
      const miscCategoryPayload: ApiSchema.NewCategory = {
        name: 'Misc.',
        parentId: payload.parentId,
      };
      const miscCategory = await database.createCategory(miscCategoryPayload);

      // (B) Move all existing transactions into the "Misc." category
      await database.moveTransactionsToNewCategory(
        payload.parentId,
        miscCategory.id
      );

      // (C) Update balances for the "Misc." category and the parent.
      const parentCategory = await database.getCategory(payload.parentId);
      const currentBalance = parentCategory.balance;
      await database.updateCategoryBalance(miscCategory.id, currentBalance);
      await database.updateCategoryBalance(payload.parentId, null);
    }
  }

  return database.createCategory(payload);
}
