/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { AMOUNT_STATUS, ApiSchema } from '../../shared-lib';
import { database } from './index';
import { prismaMock } from '../../prisma-mock';

describe('Function `database.updateAccountSubrecord`', () => {
  it('calls the Prisma client with the provided subrecord ID', async () => {
    const subrecord: ApiSchema.UpdateAccountSubrecord = {
      accountId: 'abcde',
      amount: 1567,
      id: '1234',
      isCredit: false,
      status: AMOUNT_STATUS.PENDING,
    };

    await database.updateAccountSubrecord(subrecord);

    expect(prismaMock.transactionAccount.update).toBeCalledTimes(1);
    expect(prismaMock.transactionAccount.update).toBeCalledWith({
      where: { id: subrecord.id },
      data: subrecord,
    });
  });
});
