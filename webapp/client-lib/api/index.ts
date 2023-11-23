/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { postExtantTransaction } from './post-extant-transaction';
import { postNewTransaction } from './post-new-transaction';
import { useAllAccounts } from './use-all-accounts';
import { useAllCategories } from './use-all-categories';
import { useAllTransactions } from './use-all-transactions';

export const api = {
  postExtantTransaction,
  postNewTransaction,
  useAllAccounts,
  useAllCategories,
  useAllTransactions,
};
