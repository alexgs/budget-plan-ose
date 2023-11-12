/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { accountApiToModel } from './account-api-to-model';
import { accountModelToApi } from './account-model-to-api';
import { categoryApiToModel } from './category-api-to-model';
import { categoryModelToApi } from './category-model-to-api';
import { txnApiToModel } from './txn-api-to-model';
import { txnModelToApi } from './txn-model-to-api';

export const transformers = {
  accountApiToModel,
  accountModelToApi,
  categoryApiToModel,
  categoryModelToApi,
  txnApiToModel,
  txnModelToApi,
};
