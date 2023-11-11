/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { SYSTEM_IDS } from '../../shared-lib';
import { database } from '../database';

export async function getPublicCategories() {
  return database.getCategoriesExceptIds([
    SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
  ]);
}
