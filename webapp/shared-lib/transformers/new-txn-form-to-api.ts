/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { UseFormReturnType } from '@mantine/form';
import { formatUtcDate } from '../../client-lib';
import { FormValues } from '../../components/TransactionTableV2/TransactionForm';
import { ACCOUNT_TYPES, AMOUNT_STATUS, TRANSACTION_TYPES } from '../constants';
import { dollarsToCents } from '../dollars-to-cents';
import { ApiSchema } from '../schema-v2/api-schema';
import { ModelSchema } from '../schema-v2/model-schema';
import { AccountType, TransactionType } from '../types';

function getAccountType(
  accounts: ModelSchema.Account[],
  accountId: string
): AccountType {
  const account = accounts.find((account) => account.id === accountId);
  if (account) {
    return account.accountType;
  }

  throw new Error(`Unknown account id ${accountId}.`);
}

function getTransactionType(
  accounts: ModelSchema.Account[],
  accountId: string
): TransactionType {
  const accountType: AccountType = getAccountType(accounts, accountId);
  return accountType === ACCOUNT_TYPES.CREDIT_CARD
    ? TRANSACTION_TYPES.CREDIT_CARD_CHARGE
    : TRANSACTION_TYPES.PAYMENT;
}

function multiRowFormToApi(
  values: UseFormReturnType<FormValues>['values'],
  accounts: ModelSchema.Account[]
): ApiSchema.NewTransaction {
  const categories: ApiSchema.NewCategorySubrecord[] = [];
  for (let i = 1; i < values.categories.length; i++) { // Start with index 1 to skip the first row
    categories.push({
      categoryId: values.categories[i],
      credit: dollarsToCents(values.credit[i]),
      debit: dollarsToCents(values.debit[i]),
      notes: values.notes[i],
    });
  }

  return {
    categories,
    date: formatUtcDate(values.date),
    description: values.description,
    type: getTransactionType(accounts, values.account),
    accounts: [
      {
        accountId: values.account,
        credit: dollarsToCents(values.credit[0]),
        debit: dollarsToCents(values.debit[0]),
        status: AMOUNT_STATUS.PENDING,
      },
    ],
  };
}

function singleRowFormToApi(
  values: UseFormReturnType<FormValues>['values'],
  accounts: ModelSchema.Account[]
): ApiSchema.NewTransaction {
  return {
    date: formatUtcDate(values.date),
    description: values.description,
    type: getTransactionType(accounts, values.account),
    accounts: [
      {
        accountId: values.account,
        credit: dollarsToCents(values.credit[0]),
        debit: dollarsToCents(values.debit[0]),
        status: AMOUNT_STATUS.PENDING,
      },
    ],
    categories: [
      {
        categoryId: values.categories[0],
        credit: dollarsToCents(values.credit[0]),
        debit: dollarsToCents(values.debit[0]),
        notes: values.notes[0],
      }
    ],
  };
}

export function newTxnFormToApi(
  values: UseFormReturnType<FormValues>['values'],
  accounts: ModelSchema.Account[]
): ApiSchema.NewTransaction {
  if (values.categories.length === 1) {
    return singleRowFormToApi(values, accounts);
  }
  return multiRowFormToApi(values, accounts);
}
