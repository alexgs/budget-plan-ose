/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { mockDeep } from 'jest-mock-extended';
import { ACCOUNT_TYPES, ApiSchema } from '../../shared-lib';
import { service } from './index';
import { database } from '../database';

jest.mock('../database', () => ({
  database: mockDeep<typeof database>(),
}));

describe('Function `createAccount`', () => {
  describe('when creating an account of any type', () => {
    it('passes the payload to the database layer', async () => {
      const payload: ApiSchema.NewAccount = {
        accountType: ACCOUNT_TYPES.CHECKING,
        description: 'Test checking account',
      };
      await service.createAccount(payload);

      expect(database.createAccount).toBeCalledTimes(1);
      expect(database.createAccount).toBeCalledWith(payload);
    });
  });

  describe('when creating a credit card account', () => {
    it.todo('creates a reservation category');
  });
});
