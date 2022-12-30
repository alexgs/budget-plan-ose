/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { SYSTEM_IDS } from '../../shared-lib';
import { database } from '../index';

const accountTransferCategoryData = {
  id: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
  isSystem: true,
  name: 'Account transfers',
};

const categoryTransferCategoryData = {
  id: SYSTEM_IDS.CATEGORIES.CATEGORY_TRANSFER,
  isSystem: true,
  name: 'Category transfers',
};

export async function ensureSystemCategories() {
  await database.ensureCategory(accountTransferCategoryData);
  await database.ensureCategory(categoryTransferCategoryData);
}
