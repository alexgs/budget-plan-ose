/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ApiSchema } from '../schema-v2/api-schema';
import { ModelSchema } from '../schema-v2/model-schema';

export function accountModelToApi(account: ModelSchema.Account): ApiSchema.Account {
  return {
    ...account,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  };
}
