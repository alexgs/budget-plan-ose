/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';

import { newAccountSubrecord } from './new-account-subrecord';

export const updateAccountSubrecord = newAccountSubrecord.concat(
  yup.object({
    id: yup.string().uuid().required(),
  })
);
