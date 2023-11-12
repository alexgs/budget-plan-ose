/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Transaction } from '../../shared-lib';
import { database } from '../database';

export async function saveNewTransaction(
  base: ApiSchema.NewTransactionBase,
  accountSubrecords: ApiSchema.NewAccountSubrecord[],
  categorySubrecords: ApiSchema.NewCategorySubrecord[]
): Promise<Transaction> {
  // TODO If we tracked the balance for the base transaction, then we could detect when there are missing subrecords
  // TODO All of the DB updates in here should be wrapped in a single DB transaction

  const txnBase = await database.saveNewTransactionBase(base);
  await Promise.all(
    accountSubrecords.map((subrecord) =>
      database.saveNewAccountSubrecord(txnBase.id, subrecord)
    )
  );
  await Promise.all(
    categorySubrecords.map((subrecord) =>
      database.saveNewCategorySubrecord(txnBase.id, subrecord)
    )
  );
  return database.getTransaction(txnBase.id);
}
