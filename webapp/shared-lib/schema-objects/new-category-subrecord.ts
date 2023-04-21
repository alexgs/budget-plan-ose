/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';
import { AMOUNT_STATUS } from '../constants';

export const newCategorySubrecord = yup.object({
  amount: yup.number().required(),
  categoryId: yup.string().required(),
  isCredit: yup.boolean().required(),
  notes: yup.string().nullable(),
}).noUnknown();
