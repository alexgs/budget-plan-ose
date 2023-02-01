/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Category } from '../../shared-lib';

export type CategoryPayload = Partial<Pick<Category, 'name' | 'parentId'>>;
