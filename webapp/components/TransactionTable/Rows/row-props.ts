/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Account, ApiSchema, Category } from '../../../shared-lib';

export interface RowProps {
  accountData: Account[];
  categoryData: Category[];
  txn: ApiSchema.Transaction;
}

