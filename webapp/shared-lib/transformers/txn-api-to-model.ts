/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { DateTime } from "luxon";

import { ApiSchema } from '../schema-v2/api-schema';
import { ModelSchema } from '../schema-v2/model-schema';

export function txnApiToModel(
  txn: ApiSchema.Transaction
): ModelSchema.Transaction {
  return {
    ...txn,
    date: DateTime.fromISO(txn.date).toJSDate(), // Use Luxon to get the date in the local timezone
    accounts: txn.accounts.map((a) => ({
      ...a,
      createdAt: new Date(a.createdAt),
      updatedAt: new Date(a.updatedAt),
    })),
    categories: txn.categories.map((c) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
    })),
    createdAt: new Date(txn.createdAt),
    updatedAt: new Date(txn.updatedAt),
  };
}
