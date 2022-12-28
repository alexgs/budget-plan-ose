/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ACCOUNT_TYPES } from './constants';

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
