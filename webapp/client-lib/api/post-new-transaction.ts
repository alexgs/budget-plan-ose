/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib';
import { formatClientDate } from '../format-client-date';

export async function postNewTransaction(
  values: ApiSchema.NewTransaction
): Promise<Response> {
  return fetch('/api/transactions', {
    body: JSON.stringify({
      ...values,
      // Mantine makes us store the date as a `Date` object. The API only
      //   deals with strings in YYYY-MM-DD (see project README for more
      //   detail), so we need to format the date in the payload.
      date: formatClientDate(values.date),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
