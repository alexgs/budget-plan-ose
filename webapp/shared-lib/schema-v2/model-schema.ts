/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { Validators } from './validators';

export namespace ModelSchema {
  export type Account = z.infer<typeof Validators.Account>;
  export type Category = z.infer<typeof Validators.Category>;
  export type Transaction = z.infer<typeof Validators.Transaction>;
}
