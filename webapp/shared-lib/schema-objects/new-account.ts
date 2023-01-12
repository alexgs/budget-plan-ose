/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';
import { ACCOUNT_TYPES } from '../constants';

export const newAccount = yup.object({
  accountType: yup.string().oneOf(Object.values(ACCOUNT_TYPES)).required(),
  description: yup.string().required(),
});
