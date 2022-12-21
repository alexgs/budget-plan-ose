/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES } from './constants';

type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];

export function getFriendlyAccountType(
  accountType: AccountType
): string {
  switch (accountType) {
    case ACCOUNT_TYPES.CHECKING:
      return 'Checking';
    case ACCOUNT_TYPES.CREDIT_CARD:
      return 'Credit card';
    case ACCOUNT_TYPES.OTHER:
      return 'Other';
    case ACCOUNT_TYPES.SAVINGS:
      return 'Savings';
    default:
      throw new Error(`Unknown account type: ${accountType}`);
  }
}
