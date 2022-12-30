/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { SchemaTypes } from '../../shared-lib';
import { database } from '../database';
import { ensureSystemCategories } from './ensure-system-categories';

export async function createCategory(payload: SchemaTypes.NewCategory) {
  await ensureSystemCategories();
  return database.createCategory(payload);
}
