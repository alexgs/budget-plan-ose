/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, sumSubrecords, Transaction } from '../../shared-lib';
import { service } from './index';

export async function processCategoryTransfer(
  payload: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
): Promise<Transaction> {
  // The payload contains zero account subrecords
  const { categories, ...record } = payload;

  // TODO There should also be a check for duplicate categories
  const sum = sumSubrecords(categories);
  if (sum !== 0) {
    throw new Error(
      `All of the amounts in a category transfer must sum to $0, but got $${sum} instead.`
    );
  }

  return service.saveTransaction(payload);
}
