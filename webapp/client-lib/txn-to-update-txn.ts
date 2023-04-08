/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, TransactionType } from '../shared-lib';

export function txnToUpdateTxn(
  txn: ApiSchema.Transaction
): ApiSchema.UpdateTransaction {
  const temp: Partial<ApiSchema.Transaction> = {
    ...txn,
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
