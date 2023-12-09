/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { database } from '../database';
import { txnDbToModel } from '../../shared-lib/transformers/txn-db-to-model';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';

export async function getAllTransactions(
  accountId?: string
): Promise<ModelSchema.Transaction[]> {
  const txns = await database.getTransactions(accountId);
  return txns.map(txnDbToModel);
}
