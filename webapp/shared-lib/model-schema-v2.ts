/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { z } from 'zod';
import { ApiSchema } from './api-schema-v2';

export namespace ModelSchema {
  export type Account = z.infer<typeof ApiSchema.Account>;
  export type Category = z.infer<typeof ApiSchema.Category>;
  export type Transaction = z.infer<typeof ApiSchema.Transaction>;
}
