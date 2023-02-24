/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Transaction } from '../shared-lib';

export function formatTransaction(txn: Transaction) {
  const utcDate = [
    txn.date.getUTCFullYear(),
    padTwoDigits(txn.date.getUTCMonth() + 1),
    padTwoDigits(txn.date.getUTCDate()),
  ].join('-');

  return {
    ...txn,
    date: utcDate,
  };
}

function padTwoDigits(x: number): string {
  return x.toString(10).padStart(2, '0');
}
