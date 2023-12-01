/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { database } from '../database';
import { ApiSchema } from '../../shared-lib/schema-v2/api-schema';
import { DbSchema } from '../../shared-lib/schema-v2/database-schema';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { newTxnApiToDb } from '../../shared-lib/transformers/new-txn-api-to-db';
import { txnDbToModel } from '../../shared-lib/transformers/txn-db-to-model';

export async function createTransaction(
  txn: ApiSchema.NewTransaction
): Promise<ModelSchema.Transaction> {
  const dbTxn: DbSchema.NewTransaction = newTxnApiToDb(txn);
  const result = await database.createTransaction(dbTxn);
  return txnDbToModel(result);
}
