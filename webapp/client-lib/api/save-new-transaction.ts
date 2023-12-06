/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib/schema-v2/api-schema';

export async function saveNewTransaction(
  values: ApiSchema.NewTransaction
): Promise<Response> {
  return fetch('/api/v2/transactions', {
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
