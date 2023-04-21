/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as yup from 'yup';

export const updateCategory = yup.object({
  name: yup.string(),
  parentId: yup.string().nullable(),
});

