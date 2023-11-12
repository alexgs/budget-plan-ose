/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { Validators } from './validators';

export namespace ModelSchema {
  export type Account = Omit<
    z.infer<typeof Validators.Account>,
    'createdAt' | 'updatedAt'
  > & {
    createdAt: Date;
    updatedAt: Date;
  };
  export type AccountSubrecord = Omit<
    z.infer<typeof Validators.AccountSubrecord>,
    'createdAt' | 'updatedAt'
  > & {
    createdAt: Date;
    updatedAt: Date;
  };
  export type Category = Omit<
    z.infer<typeof Validators.Category>,
    'createdAt' | 'updatedAt'
  > & {
    createdAt: Date;
    updatedAt: Date;
  };
  export type CategorySubrecord = Omit<
    z.infer<typeof Validators.CategorySubrecord>,
    'createdAt' | 'updatedAt'
  > & {
    createdAt: Date;
    updatedAt: Date;
  };
  export type Transaction = Omit<
    z.infer<typeof Validators.Transaction>,
    'accounts' | 'categories' | 'createdAt' | 'date' | 'updatedAt'
  > & {
    accounts: AccountSubrecord[];
    categories: CategorySubrecord[];
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}
