/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';

// Sample object
// {
//   "id": "3819087c-c9e6-4305-bbb5-3d7747dc168b",
//   "recordId": "d7588ea4-e45b-4a9e-a4b1-ad1ddc2970e8",
//   "notes": null,
//   "credit": 300000,
//   "debit": 300000,
//   "categoryId": "69cb96aa-a1a1-5c33-8977-8e83fe0783ee",
//   "createdAt": "2023-10-09T21:09:21.326Z",
//   "updatedAt": "2023-10-09T21:09:21.326Z"
// }

export const CategorySubrecord = z.object({
  id: z.string().uuid(),
  categoryId: z.string().uuid(),
  credit: z.number(),
  debit: z.number(),
  notes: z.string().nullable(),
  recordId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NewCategorySubrecord = CategorySubrecord.pick({
  categoryId: true,
  credit: true,
  debit: true,
  notes: true,
});

export const UpdateCategorySubrecord = NewCategorySubrecord.omit({
  /* omit nothing */
});
