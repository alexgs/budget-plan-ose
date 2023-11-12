/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ApiSchema } from '../schema-v2/api-schema';
import { ModelSchema } from '../schema-v2/model-schema';

export function accountApiToModel(
  account: ApiSchema.Account
): ModelSchema.Account {
  return {
    ...account,
    createdAt: new Date(account.createdAt),
    updatedAt: new Date(account.updatedAt),
  };
}
