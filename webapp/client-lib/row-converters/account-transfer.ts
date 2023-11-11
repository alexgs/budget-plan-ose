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
  accounts?: ModelSchema.Account[],
): TransactionRow {
  const fromAccount = getAccountNameIfAvailable(txn.accounts[0].accountId, accounts);
  const toAccount = getAccountNameIfAvailable(txn.accounts[1].accountId, accounts);
  return {
    account: fromAccount,
    credit: txn.accounts[0].credit,
    category: '',
    date: formatClientDate(txn.date),
    debit: txn.accounts[0].debit,
    description: `Transfer to ${toAccount}`,
    notes: '',
  }
}
