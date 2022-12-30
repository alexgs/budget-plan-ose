/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';

export const newAccount = yup.object({
  accountType: yup.string().required(), // TODO This can be a more specific filter
  description: yup.string().required(),
});

