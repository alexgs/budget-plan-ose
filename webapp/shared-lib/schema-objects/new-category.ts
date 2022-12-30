/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';

export const newCategory = yup.object({
  name: yup.string().required(),
  parentId: yup.string().nullable(),
});

