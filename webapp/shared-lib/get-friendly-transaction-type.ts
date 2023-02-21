/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TRANSACTION_TYPES } from './constants';
import { TransactionType } from './types';

export function getFriendlyTransactionType(
  transactionType: TransactionType
): string {
  switch (transactionType) {
    case TRANSACTION_TYPES.ACCOUNT_TRANSFER:
      return 'Transfer (between accounts)';
    case TRANSACTION_TYPES.CATEGORY_TRANSFER:
      return 'Transfer (between categories)';
    case TRANSACTION_TYPES.CREDIT_CARD_CHARGE:
      return 'Credit card charge';
    case TRANSACTION_TYPES.CREDIT_CARD_PAYMENT:
      return 'Credit card payment';
    case TRANSACTION_TYPES.PAYMENT:
      return 'Payment';
    default:
      throw new Error(`Unknown account type: ${transactionType}`);
  }
}
