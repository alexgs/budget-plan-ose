/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib';
import { database } from '../database';

export async function ensureDefaultChildCategory(parentId: string): Promise<void> {
  const numSiblingCategories = await database.countChildCategories(parentId);
  if (numSiblingCategories === 0) {
    // (A) Create a category called "Misc."
    const miscCategoryPayload: ApiSchema.NewCategory = {
      name: 'Misc.',
      parentId: parentId,
    };
    const miscCategory = await database.createCategory(miscCategoryPayload);

    // (B) Move all existing transactions into the "Misc." category
    await database.moveTransactionsToNewCategory(
      parentId,
      miscCategory.id
    );

    // (C) Update balances for the "Misc." category and the parent.
    const parentCategory = await database.getCategory(parentId);
    const currentBalance = parentCategory.balance;
    await database.updateCategoryBalance(miscCategory.id, currentBalance);
    await database.updateCategoryBalance(parentId, null);
  }
}
