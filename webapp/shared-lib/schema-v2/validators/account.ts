/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { ACCOUNT_TYPES } from '../../constants';

// Sample object
// {
//   "id": "c3556f1a-76c2-4038-ab17-ed1d56c78cee",
//   "description": "WF Savings",
//   "createdAt": "2023-03-09T00:45:52.541Z",
//   "updatedAt": "2023-10-14T15:16:11.030Z",
//   "accountType": "account-types.savings",
//   "isSystem": false,
//   "balance": 500
// }

export const Account = z.object({
  id: z.string().uuid(),
  accountType: z.nativeEnum(ACCOUNT_TYPES),
  balance: z.number(),
  description: z.string(),
  isSystem: z.boolean(),
  order: z.number().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NewAccount = Account.pick({
  accountType: true,
  description: true,
});

export const UpdateAccount = NewAccount.omit({
  /* omit nothing */
});
