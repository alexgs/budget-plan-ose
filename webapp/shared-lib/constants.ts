import { v5 as uuidV5 } from 'uuid';

export const AMOUNT_STATUS = {
  CLEARED: 'amount-status.cleared',
  PENDING: 'amount-status.pending',
  RECONCILED: 'amount-status.reconciled',
}

export const ACCOUNT_TYPES = {
  CREDIT_CARD: 'account-types.credit-card',
  CHECKING: 'account-types.checking',
  SAVINGS: 'account-types.savings',
  OTHER: 'account-types.other',
} as const;

export const NO_PARENT_CATEGORY = 'no-parent-category-id';

export const TRANSACTION_TYPES = {
  PAYMENT: 'transaction-types.payment',
  CREDIT_CARD_CHARGE: 'transaction-types.credit-card-charge',
  ACCOUNT_TRANSFER: 'transaction-types.account-transfer',
  CATEGORY_TRANSFER: 'transaction-types.category-transfer',
} as const;

export const UUID_NAMESPACE = 'bf362cfd-8a1e-430b-a790-be139388867d';

export const SYSTEM_IDS = {
  ACCOUNTS: {
    CATEGORY_TRANSFER: uuidV5(
      'system-ids.accounts.category-transfer',
      UUID_NAMESPACE
    ),
  } as const,
  CATEGORIES: {
    ACCOUNT_TRANSFER: uuidV5(
      'system-ids.categories.account-transfer',
      UUID_NAMESPACE
    ),
  } as const,
} as const;
