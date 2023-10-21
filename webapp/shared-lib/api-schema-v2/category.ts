/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';

// Sample object
// {
//   "id": "a5e418bb-010e-467c-95b7-b7350b7cfd41",
//   "balance": 0,
//   "name": "Microsoft 365",
//   "order": null,
//   "parentId": "1195e813-e21b-47d6-abfd-a646b9fbf795",
//   "createdAt": "2023-10-11T21:17:22.656Z",
//   "updatedAt": "2023-10-14T15:16:11.161Z",
//   "isSystem": false
// }

export const Category = z.object({
  id: z.string().uuid(),
  balance: z.number().nullable(),
  name: z.string(),
  order: z.number().nullable(),
  parentId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isSystem: z.boolean(),
});

export const NewCategory = Category.pick({
  name: true,
  parentId: true,
});

export const UpdateCategory = NewCategory.partial().omit({
  /* omit nothing */
});
