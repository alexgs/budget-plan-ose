/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { DbSchema, SYSTEM_IDS } from '../../shared-lib';
import { database } from '../index';

const accountTransferCategoryData: DbSchema.NewCategory = {
  id: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
  isSystem: true,
  name: 'Account transfers',
};

export async function ensureSystemCategories() {
  await database.ensureCategory(accountTransferCategoryData);
}
