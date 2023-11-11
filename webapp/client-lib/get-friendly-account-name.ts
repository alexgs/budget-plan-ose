/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ModelSchema } from '../shared-lib/schema-v2/model-schema';

export function getFriendlyAccountName(accounts: ModelSchema.Account[], accountId: string) {
  return (
    accounts.find((account) => account.id === accountId)?.description ??
    'Unknown'
  );
}
