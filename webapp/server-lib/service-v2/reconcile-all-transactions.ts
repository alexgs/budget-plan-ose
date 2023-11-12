/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { database } from '../database';

export async function reconcileAllTransactions() {
  return database.reconcileAllTransactions();
}
