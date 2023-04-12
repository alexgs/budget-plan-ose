/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import {
  AMOUNT_STATUS,
  ApiSchema,
  Transaction,
  TRANSACTION_TYPES
} from '../../shared-lib';
import { database } from '../database';
import { service } from './index';

jest.mock('../database', () => ({
  database: mockDeep<typeof database>(),
}));

const databaseMock = database as unknown as DeepMockProxy<typeof database>

describe('Function `saveExtantTransaction`', () => {
  it('executes its happy path', async () => {
    const newBase: ApiSchema.UpdateTransactionBase = {
      id: 'abc123',
      type: TRANSACTION_TYPES.PAYMENT,
      description: 'Just another test transaction',
      date: new Date('2022-12-31'),
    };
    const newAccountSubrecords: ApiSchema.UpdateTransaction['accounts'] = [
      {
        id: '233',
        accountId: '501',
        isCredit: false,
        amount: 2100,
        status: AMOUNT_STATUS.PENDING,
      },
    ];
    const newCategorySubrecords: ApiSchema.UpdateTransaction['categories'] = [
      {
        id: '234',
        categoryId: '455',
        isCredit: false,
        amount: 1000,
      },
      {
        categoryId: '456',
        isCredit: false,
        amount: 499,
      },
      {
        id: '236',
        categoryId: '457',
        isCredit: false,
        amount: 601,
      },
    ];

    const timestamp = new Date('2023-01-04T12:34:56')
    const extantAccountSubrecords: ApiSchema.Transaction['accounts'] = [
      {
        id: '233',
        accountId: '501',
        isCredit: false,
        amount: 1905,
        status: AMOUNT_STATUS.PENDING,
        createdAt: timestamp,
        updatedAt: timestamp,
        recordId: newBase.id,
      },
    ];
    const extantCategorySubrecords: ApiSchema.Transaction['categories'] = [
      {
        id: '234',
        categoryId: '455',
        isCredit: false,
        amount: 1000,
        createdAt: timestamp,
        updatedAt: timestamp,
        recordId: newBase.id,
        notes: null,
      },
      {
        id: '235',
        categoryId: '450',
        isCredit: false,
        amount: 333,
        createdAt: timestamp,
        updatedAt: timestamp,
        recordId: newBase.id,
        notes: null,
      },
      {
        id: '236',
        categoryId: '457',
        isCredit: false,
        amount: 602,
        createdAt: timestamp,
        updatedAt: timestamp,
        recordId: newBase.id,
        notes: null,
      },
    ];
    const extantTxn: Transaction = {
      ...newBase,
      // date: '2022-12-31',
      accounts: extantAccountSubrecords,
      categories: extantCategorySubrecords,
      order: 1001,
      createdAt: timestamp,
      updatedAt: timestamp,
      templateId: null,
    }
    databaseMock.getTransaction.mockResolvedValue(extantTxn);

    await service.saveExtantTransaction(
      newBase,
      newAccountSubrecords,
      newCategorySubrecords
    );

    // Delete missing account subrecords
    expect(databaseMock.deleteAccountSubrecord).toHaveBeenCalledTimes(0);

    // Delete missing category subrecords
    expect(databaseMock.deleteCategorySubrecord).toHaveBeenCalledTimes(1);
    expect(databaseMock.deleteCategorySubrecord).toHaveBeenCalledWith(extantCategorySubrecords[1].id);

    // Update modified account subrecords
    expect(databaseMock.updateAccountSubrecord).toHaveBeenCalledTimes(1);
    expect(databaseMock.updateAccountSubrecord).toHaveBeenCalledWith(newAccountSubrecords[0]);

    // Update modified category subrecords
    expect(databaseMock.updateCategorySubrecord).toHaveBeenCalledTimes(2);
    expect(databaseMock.updateCategorySubrecord).toHaveBeenCalledWith(newCategorySubrecords[0]);
    expect(databaseMock.updateCategorySubrecord).toHaveBeenCalledWith(newCategorySubrecords[2]);

    // Save new account subrecords
    expect(databaseMock.saveNewAccountSubrecord).toHaveBeenCalledTimes(0);

    // Save new category subrecords
    expect(databaseMock.saveNewCategorySubrecord).toHaveBeenCalledTimes(1);
    expect(databaseMock.saveNewCategorySubrecord).toHaveBeenCalledWith(newBase.id, newCategorySubrecords[1]);

    // Reconcile accounts and categories
    expect(databaseMock.reconcileAllTransactions).toHaveBeenCalledTimes(1);
  });
});
