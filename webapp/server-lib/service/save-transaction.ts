/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Transaction } from '../../shared-lib';
import { service } from './index';

export async function saveTransaction(
  payload: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
): Promise<Transaction> {
  const { accounts, categories, ...record } = payload;
  if ('id' in record) {
    return service.saveExtantTransaction(record, accounts, categories);
  }
  return service.saveNewTransaction(record, accounts, categories);
}
