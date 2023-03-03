/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, Transaction, TRANSACTION_TYPES } from '../../shared-lib';
import { service } from './index';

export async function processTransaction(
  payload: ApiSchema.NewTransaction
): Promise<Transaction | null> {
  let result: Transaction | null = null;
  if (payload.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
    result = await service.processAccountTransfer(payload);
  }
  if (payload.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
    result = await service.processCategoryTransfer(payload);
  }
  if (payload.type === TRANSACTION_TYPES.CREDIT_CARD_CHARGE) {
    result = await service.processCreditCardCharge(payload);
  }
  if (payload.type === TRANSACTION_TYPES.CREDIT_CARD_PAYMENT) {
    result = await service.processCreditCardPayment(payload);
  }
  if (payload.type === TRANSACTION_TYPES.PAYMENT) {
    result = await service.processPayment(payload);
  }

  return result;
}
