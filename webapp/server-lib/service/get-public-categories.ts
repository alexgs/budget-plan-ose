/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { SYSTEM_IDS } from '../../shared-lib';
import { database } from '../index';

/**
 * Returns all categories except those with system IDs
 */
export async function getPublicCategories() {
  return database.getCategoriesExceptIds([
    SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
  ]);
}
