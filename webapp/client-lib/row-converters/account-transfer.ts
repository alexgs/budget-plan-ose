/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { formatClientDate } from '../format-client-date';
import { TransactionRow } from '../types';
import getAccountNameIfAvailable from './get-account-name-if-available';

export default function accountTransferRowConverter(
  txn: ModelSchema.Transaction,
  accounts?: ModelSchema.Account[]
): TransactionRow {
  if (txn.accounts.length !== 2 && txn.categories.length !== 0) {
    console.log(`Invalid account transfer transaction: ${txn.id}`);
  }

  let fromSubrecord = null;
  let toSubrecord = null;
  if (txn.accounts[0].debit > 0) {
    fromSubrecord = txn.accounts[0];
    toSubrecord = txn.accounts[1];
  } else {
    fromSubrecord = txn.accounts[1];
    toSubrecord = txn.accounts[0];
  }

  const fromAccount = getAccountNameIfAvailable(
    fromSubrecord.accountId,
    accounts
  );
  const toAccount = getAccountNameIfAvailable(toSubrecord.accountId, accounts);
  return {
    account: fromAccount,
    credit: 0,
    category: '',
    date: formatClientDate(txn.date),
    debit: fromSubrecord.debit,
    description: `Transfer to ${toAccount}`,
    notes: '',
  };
}
