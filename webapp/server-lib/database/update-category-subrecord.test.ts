/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema } from '../../shared-lib';
import { database } from './index';
import { prismaMock } from '../../prisma-mock';

describe('Function `database.updateCategorySubrecord`', () => {
  it('calls the Prisma client with the provided subrecord ID', async () => {
    const subrecord: ApiSchema.UpdateCategorySubrecord = {
      categoryId: 'abcde',
      amount: 1567,
      id: '1234',
      isCredit: false,
    };

    await database.updateCategorySubrecord(subrecord);

    expect(prismaMock.transactionCategory.update).toBeCalledTimes(1);
    expect(prismaMock.transactionCategory.update).toBeCalledWith({
      where: { id: subrecord.id },
      data: subrecord,
    });
  });
});
