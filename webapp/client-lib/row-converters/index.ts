/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { TRANSACTION_TYPES } from '../../shared-lib';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { TransactionRow } from '../types';
import accountTransferRowConverter from './account-transfer';
import creditCardChargeRowConverter from './credit-card-charge';
import defaultRowConverter from './default';
import depositRowConverter from './deposit';
import paymentRowConverter from './payment';

export function getRows(
  transactions: ModelSchema.Transaction[],
  accounts?: ModelSchema.Account[],
  categories?: ModelSchema.Category[]
): TransactionRow[] {
  return transactions.map((txn) => {
    if (txn.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
      return accountTransferRowConverter(txn, accounts);
    }
    if (txn.type === TRANSACTION_TYPES.CREDIT_CARD_CHARGE) {
      return creditCardChargeRowConverter(txn, accounts, categories);
    }
    if (txn.type === TRANSACTION_TYPES.DEPOSIT) {
      return depositRowConverter(txn, accounts, categories);
    }
    if (txn.type === TRANSACTION_TYPES.PAYMENT) {
      return paymentRowConverter(txn, accounts, categories);
    }
    return defaultRowConverter(txn, accounts, categories);
  });
}
