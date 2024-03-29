/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { formatUtcDate } from '../../client-lib';
import { ApiSchema } from '../schema-v2/api-schema';
import { ModelSchema } from '../schema-v2/model-schema';

// This transformer is used for converting models from the database to the API
// format. If it's used in other contexts, the date handling might need to be
// adjusted to handle the different use-cases.

export function txnModelToApi(
  txn: ModelSchema.Transaction
): ApiSchema.Transaction {
  return {
    ...txn,
    date: formatUtcDate(txn.date), // We want the UTC date (not the local date) from the Date object
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
