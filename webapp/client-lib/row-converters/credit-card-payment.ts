/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { TransactionRow } from '../types';
import { getAccountNameIfAvailable } from './get-account-name-if-available';

export default function creditCardPaymentRowConverter(
  txn: ModelSchema.Transaction,
  accounts?: ModelSchema.Account[],
): TransactionRow {
  const paymentAccountSubrecord = txn.accounts.find((subrecord) => subrecord.credit === 0);
  const cardAccountSubrecord = txn.accounts.find((subrecord) => subrecord.credit !== 0);
  if (!paymentAccountSubrecord || !cardAccountSubrecord) {
    throw new Error(`Invalid credit card payment: ${txn.id}`);
  }

  const description = `Payment to "${getAccountNameIfAvailable(cardAccountSubrecord.accountId, accounts)}" card`
  return {
    description,
    account: getAccountNameIfAvailable(paymentAccountSubrecord.accountId, accounts),
    credit: 0,
    category: '',
    date: formatClientDate(txn.date),
    debit: paymentAccountSubrecord.debit,
    notes: '',
  };
}
