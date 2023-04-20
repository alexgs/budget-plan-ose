/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { prisma } from '../index';
import { ApiSchema } from '../../shared-lib';

export async function updateCategorySubrecord(
  subrecord: ApiSchema.UpdateCategorySubrecord
): Promise<void> {
  await prisma.transactionCategory.update({
    where: { id: subrecord.id },
    data: subrecord,
  });
}
