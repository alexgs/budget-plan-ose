/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { formatUtcDate } from '../../client-lib';
import { ApiSchema } from '../schema-v2/api-schema';
import { ModelSchema } from '../schema-v2/model-schema';

export function txnModelToApi(
  txn: ModelSchema.Transaction
): ApiSchema.Transaction {
  return {
    ...txn,
    date: formatUtcDate(txn.date),
    accounts: txn.accounts.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    })),
    categories: txn.categories.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    })),
    createdAt: txn.createdAt.toISOString(),
    updatedAt: txn.updatedAt.toISOString(),
  };
}
