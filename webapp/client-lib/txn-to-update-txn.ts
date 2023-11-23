/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, TransactionType } from '../shared-lib';
import { ModelSchema } from '../shared-lib/schema-v2/model-schema';

export function txnToUpdateTxn(
  txn: ModelSchema.Transaction
): ApiSchema.UpdateTransaction {
  const temp: Partial<ApiSchema.Transaction> = {
    ...txn,
    date: txn.date.toISOString(),
    id: txn.id as string,
    type: txn.type as TransactionType,
  };
  delete temp.createdAt;
  delete temp.updatedAt;

  return {
    ...temp,
    date: new Date(txn.date),
  } as ApiSchema.UpdateTransaction;
}
