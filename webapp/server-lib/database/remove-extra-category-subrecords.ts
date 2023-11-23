/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { prisma } from '../index';

export async function removeExtraCategorySubrecords() {
  // Remove all category subrecords with amount = 0
  await prisma.transactionCategory.deleteMany({
    where: { amount: 0 },
  });
}
