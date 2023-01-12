/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib';
import { database } from '../database';

import { service } from './index';

export async function createCategory(payload: ApiSchema.NewCategory) {
  await service.ensureSystemCategories();
  return database.createCategory(payload);
}
