/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Account, NewAccount, UpdateAccount } from './account';
import {
  AccountSubrecord,
  NewAccountSubrecord,
  UpdateAccountSubrecord
} from './account-subrecord';
import { Category, NewCategory, UpdateCategory } from './category';
import {
  CategorySubrecord,
  NewCategorySubrecord,
  UpdateCategorySubrecord
} from './category-subrecord';
import { NewTransaction, Transaction, UpdateTransaction } from './transaction';

export const ApiSchema = {
  Account,
  AccountSubrecord,
  Category,
  CategorySubrecord,
  NewAccount,
  NewAccountSubrecord,
  NewCategory,
  NewCategorySubrecord,
  NewTransaction,
  Transaction,
  UpdateAccount,
  UpdateAccountSubrecord,
  UpdateCategory,
  UpdateCategorySubrecord,
  UpdateTransaction,
};
