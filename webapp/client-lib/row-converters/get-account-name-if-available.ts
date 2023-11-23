/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { getFriendlyAccountName } from '../get-friendly-account-name';

export function getAccountNameIfAvailable(
  accountId: string,
  accounts?: ModelSchema.Account[]
) {
  if (!accounts) {
    return '...';
  }

  return getFriendlyAccountName(accounts, accountId);
}
