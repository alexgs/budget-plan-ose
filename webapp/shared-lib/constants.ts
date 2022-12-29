export const ACCOUNT_TYPES = {
  CREDIT_CARD: 'account-types.credit-card',
  CHECKING: 'account-types.checking',
  SAVINGS: 'account-types.savings',
  OTHER: 'account-types.other'
} as const;

export const TRANSACTION_TYPES = {
  PAYMENT: 'transaction-types.payment',
  CREDIT_CARD_CHARGE: 'transaction-types.credit-card-charge',
  ACCOUNT_TRANSFER: 'transaction-types.account-transfer',
  CATEGORY_TRANSFER: 'transaction-types.category-transfer',
} as const;
