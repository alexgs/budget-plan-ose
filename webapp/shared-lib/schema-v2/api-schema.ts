/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { Validators } from './validators';

export namespace ApiSchema {
  export type Account = z.infer<typeof Validators.Account>;
  export type AccountSubrecord = z.infer<typeof Validators.AccountSubrecord>;
  export type Category = z.infer<typeof Validators.Category>;
  export type CategorySubrecord = z.infer<typeof Validators.CategorySubrecord>;
  export type NewTransaction = z.infer<typeof Validators.NewTransaction>;
  export type Transaction = z.infer<typeof Validators.Transaction>;
}
