/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { TRANSACTION_TYPES } from '../constants';
import {
  AccountSubrecord,
  NewAccountSubrecord,
  UpdateAccountSubrecord
} from './account-subrecord';
import {
  CategorySubrecord,
  NewCategorySubrecord,
  UpdateCategorySubrecord
} from './category-subrecord';

// Sample object
// {
//   "id": "d7588ea4-e45b-4a9e-a4b1-ad1ddc2970e8",
//   "date": "2023-10-09",
//   "order": 1094,
//   "description": "Credit card payment",
//   "type": "transaction-types.credit-card-payment",
//   "templateId": null,
//   "createdAt": "2023-10-09T21:09:21.287Z",
//   "updatedAt": "2023-10-09T21:09:21.287Z",
//   "accounts": [
//     {
//       "id": "bc5ed21e-beaf-4e6e-9e93-d48e23f83a8c",
//       "accountId": "7e5c24fb-8520-4513-90fe-5ef49633ff47",
//       "recordId": "d7588ea4-e45b-4a9e-a4b1-ad1ddc2970e8",
//       "amount": 300000,
//       "isCredit": false,
//       "status": "amount-status.pending",
//       "createdAt": "2023-10-09T21:09:21.316Z",
//       "updatedAt": "2023-10-09T21:09:21.316Z"
//     },
//     {
//       "id": "d004ea3e-ebc5-4e41-91bc-81e08c9578b2",
//       "accountId": "58eb6de1-e589-49b2-b30b-7d649537cd45",
//       "recordId": "d7588ea4-e45b-4a9e-a4b1-ad1ddc2970e8",
//       "amount": 300000,
//       "isCredit": true,
//       "status": "amount-status.pending",
//       "createdAt": "2023-10-09T21:09:21.315Z",
//       "updatedAt": "2023-10-09T21:09:21.315Z"
//     }
//   ],
//   "categories": [
//     {
//       "id": "3819087c-c9e6-4305-bbb5-3d7747dc168b",
//       "recordId": "d7588ea4-e45b-4a9e-a4b1-ad1ddc2970e8",
//       "notes": null,
//       "amount": 300000,
//       "isCredit": false,
//       "categoryId": "69cb96aa-a1a1-5c33-8977-8e83fe0783ee",
//       "createdAt": "2023-10-09T21:09:21.326Z",
//       "updatedAt": "2023-10-09T21:09:21.326Z"
//     }
//   ]
// }

// regex source: https://regexr.com/2rign
const dateRegex = new RegExp(
  /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/
);

export const Transaction = z.object({
  id: z.string().uuid(),
  date: z.custom<{ arg: string }>((value) => {
    return typeof value === 'string' ? dateRegex.test(value) : false;
  }),
  description: z.string(),
  order: z.number().nullable(),
  templateId: z.string().uuid().nullable(),
  type: z.nativeEnum(TRANSACTION_TYPES),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  accounts: z.array(AccountSubrecord),
  categories: z.array(CategorySubrecord),
});

export const NewTransaction = Transaction.pick({
  date: true,
  description: true,
  type: true,
}).extend({
  accounts: z.array(NewAccountSubrecord),
  categories: z.array(NewCategorySubrecord),
});

export const UpdateTransaction = Transaction.pick({
  id: true,
  date: true,
  description: true,
  type: true,
}).extend({
  accounts: z.array(UpdateAccountSubrecord),
  categories: z.array(UpdateCategorySubrecord),
});
