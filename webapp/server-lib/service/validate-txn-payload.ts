/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { ApiSchema, TRANSACTION_TYPES } from '../../shared-lib';

/**
 * Validates that we have the correct type and number of subrecords for the
 * given transaction type.
 */
export function validateTxnPayload(payload: ApiSchema.NewTransaction): {
  errorMessage: string | null;
  isValidPayload: boolean;
} {
  let isValidPayload = true;
  let errorMessage = null;

  if (payload.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
    if (payload.accounts?.length !== 2 || payload.categories?.length !== 0) {
      errorMessage =
        '>> POST /api/transactions 400 For an account transfer, there ' +
        'shall be two account subrecords and zero category subrecords. <<';
      isValidPayload = false;
    }
  }

  if (payload.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
    if (payload.accounts?.length !== 0 || payload.categories?.length < 2) {
      errorMessage =
        '>> POST /api/transactions 400 For a category transfer, there ' +
        'shall be zero account subrecords and at least two category ' +
        'subrecords. <<';
      isValidPayload = false;
    }
  }

  if (payload.type === TRANSACTION_TYPES.CREDIT_CARD_CHARGE) {
    if (payload.accounts?.length !== 1 || payload.categories?.length < 1) {
      errorMessage =
        '>> POST /api/transactions 400 For a credit card charge, there ' +
        'shall be one account subrecord and at least one category ' +
        'subrecord. <<';
      isValidPayload = false;
    }
  }

  if (payload.type === TRANSACTION_TYPES.CREDIT_CARD_PAYMENT) {
    if (payload.accounts?.length !== 2 || payload.categories?.length !== 0) {
      errorMessage =
        '>> POST /api/transactions 400 For a credit card payment, there ' +
        'shall be two account subrecords and zero category subrecords. ' +
        '(The server will determine the category according to ADR1.) <<';
      isValidPayload = false;
    }
  }

  if (
    payload.type === TRANSACTION_TYPES.DEPOSIT ||
    payload.type === TRANSACTION_TYPES.PAYMENT
  ) {
    if (payload.accounts?.length < 1 || payload.categories?.length < 1) {
      errorMessage =
        '>> POST /api/transactions 400 For a payment, there shall be at ' +
        'least one account subrecord and at least one category ' +
        'subrecord. <<';
      isValidPayload = false;
    }
  }

  return { errorMessage, isValidPayload };
}
