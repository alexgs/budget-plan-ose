/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Subrecord } from '../shared-lib';
import { formatAmount } from './format-amount';

export function formatSubrecordAmount(subrecord: Subrecord): string {
  const amount = subrecord.isCredit
    ? subrecord.amount
    : -1 * subrecord.amount;
  return formatAmount(amount) ?? '$0.00';
}
