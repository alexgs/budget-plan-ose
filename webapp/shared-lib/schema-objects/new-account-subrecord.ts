/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';
import { AMOUNT_STATUS } from '../constants';

export const newAccountSubrecord = yup.object({
  accountId: yup.string().required(),
  amount: yup.number().required(),
  isCredit: yup.boolean().required(),
  status: yup.string().oneOf(Object.values(AMOUNT_STATUS)).required(),
}).noUnknown();
