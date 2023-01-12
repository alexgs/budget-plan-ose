/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TransactionAmount, TransactionRecord } from '@prisma/client';
import { database } from '../index';
import { SchemaTypes } from '../../shared-lib';

export async function processPayment(
  payload: SchemaTypes.NewTransaction
): Promise<TransactionRecord & { amounts: TransactionAmount[] }> {
  const { amounts, ...record } = payload;
  return database.savePayment(record, amounts);
}
