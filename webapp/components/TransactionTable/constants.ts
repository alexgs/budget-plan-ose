/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

export const EXTRA_ACCOUNT_OPTIONS = {
  ACCOUNT_TRANSFER: 'extra-account-options.account-transfer',
  CATEGORY_TRANSFER: 'extra-account-options.category-transfer',
} as const;

export type ExtraAccountOptions = typeof EXTRA_ACCOUNT_OPTIONS[keyof typeof EXTRA_ACCOUNT_OPTIONS];
