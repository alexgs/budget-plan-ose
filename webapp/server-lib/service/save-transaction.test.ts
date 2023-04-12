/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { AMOUNT_STATUS, ApiSchema, TRANSACTION_TYPES } from '../../shared-lib';
import { service } from './index';

describe('Function `saveTransaction`', () => {
  it('chooses the correct path for new transactions', async () => {
    service.saveNewTransaction = jest.fn();
    const txn: ApiSchema.NewTransaction = {
      type: TRANSACTION_TYPES.PAYMENT,
      description: 'Just another test transaction',
      date: new Date('2022-12-31'),
      accounts: [
        {
          accountId: '501',
          isCredit: false,
          amount: 2100,
          status: AMOUNT_STATUS.PENDING,
        },
      ],
      categories: [
        {
          categoryId: '456',
          isCredit: false,
          amount: 2100,
        },
      ],
    };

    await service.saveTransaction(txn);

    const { accounts, categories, ...record } = txn;
    expect(service.saveNewTransaction).toHaveBeenCalledTimes(1);
    expect(service.saveNewTransaction).toHaveBeenCalledWith(record, accounts, categories);

    // @ts-ignore -- TS doesn't like `mockRestore` here
    service.saveNewTransaction.mockRestore();
  });

  it('chooses the correct path for existing transactions', async () => {
    service.saveExtantTransaction = jest.fn();
    const txn: ApiSchema.UpdateTransaction = {
      id: 'abc123',
      type: TRANSACTION_TYPES.PAYMENT,
      description: 'Just another test transaction',
      date: new Date('2022-12-31'),
      accounts: [
        {
          id: 'abd',
          accountId: '501',
          isCredit: false,
          amount: 2100,
          status: AMOUNT_STATUS.PENDING,
        },
      ],
      categories: [
        {
          id: 'abe',
          categoryId: '456',
          isCredit: false,
          amount: 2100,
        },
      ],
    };

    await service.saveTransaction(txn);

    const { accounts, categories, ...record } = txn;
    expect(service.saveExtantTransaction).toHaveBeenCalledTimes(1);
    expect(service.saveExtantTransaction).toHaveBeenCalledWith(record, accounts, categories);

    // @ts-ignore -- TS doesn't like `mockRestore` here
    service.saveExtantTransaction.mockRestore();
  });
});
