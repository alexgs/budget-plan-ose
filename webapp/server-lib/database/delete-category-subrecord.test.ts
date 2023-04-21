/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { database } from './index';
import { prismaMock } from '../../prisma-mock';

describe('Function `database.deleteCategorySubrecord`', () => {
  it('calls the Prisma client with the provided subrecord ID', async () => {
    const subrecordId = '1234';

    await database.deleteCategorySubrecord(subrecordId);

    expect(prismaMock.transactionCategory.delete).toBeCalledTimes(1);
    expect(prismaMock.transactionCategory.delete).toBeCalledWith({ where: { id: subrecordId } });
  })
});
