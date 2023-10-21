/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { AMOUNT_STATUS } from '../constants';

// Sample object
// {
//   "id": "bc5ed21e-beaf-4e6e-9e93-d48e23f83a8c",
//   "accountId": "7e5c24fb-8520-4513-90fe-5ef49633ff47",
//   "recordId": "d7588ea4-e45b-4a9e-a4b1-ad1ddc2970e8",
//   "credit": 0,
//   "debit": 300000,
//   "status": "amount-status.pending",
//   "createdAt": "2023-10-09T21:09:21.316Z",
//   "updatedAt": "2023-10-09T21:09:21.316Z"
// },

export const AccountSubrecord = z.object({
  id: z.string().uuid(),
  accountId: z.string().uuid(),
  credit: z.number(),
  debit: z.number(),
  recordId: z.string().uuid(),
  status: z.nativeEnum(AMOUNT_STATUS),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NewAccountSubrecord = AccountSubrecord.pick({
  accountId: true,
  credit: true,
  debit: true,
  status: true,
});

export const UpdateAccountSubrecord = NewAccountSubrecord.omit({
  /* omit nothing */
});
