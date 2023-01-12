/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { FinancialAccount } from '@prisma/client';
import { v5 as uuidV5 } from 'uuid';
import { ACCOUNT_TYPES, UUID_NAMESPACE } from '../../shared-lib';

export function getReservationCategoryId(account: FinancialAccount) {
  if (account.accountType !== ACCOUNT_TYPES.CREDIT_CARD) {
    // This is a safety check for developers; it should never happen in production.
    throw new Error(
      `Account type ${account.accountType} may not be used with function \`getReservationCategoryId\``
    );
  }
  return uuidV5(account.id, UUID_NAMESPACE);
}
