/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect } from '@mantine/core';
import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';
import {
  ACCOUNT_TYPES,
  TRANSACTION_TYPES,
  AccountType,
  getFriendlyTransactionType,
} from '../../../shared-lib';

const creditCardTransactionTypes = Object.values(TRANSACTION_TYPES)
  .filter((value) => value !== TRANSACTION_TYPES.PAYMENT)
  .map((value) => {
    return {
      value,
      label: getFriendlyTransactionType(value),
    };
  });

const regularAccountTransactionTypes = Object.values(TRANSACTION_TYPES)
  .filter((value) => value !== TRANSACTION_TYPES.CREDIT_CARD_CHARGE)
  .map((value) => {
    return {
      value,
      label: getFriendlyTransactionType(value),
    };
  });

interface Props {
  currentAccountType: AccountType;
  mantineForm: NewTransactionFormHook;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TransactionTypeField: React.FC<Props> = (props) => {
  const transactionTypeData =
    props.currentAccountType === ACCOUNT_TYPES.CREDIT_CARD
      ? creditCardTransactionTypes
      : regularAccountTransactionTypes;
  return (
    <NativeSelect
      data={transactionTypeData}
      label="Type"
      my="sm"
      onChangeCapture={props.onChange}
      required
      {...props.mantineForm.getInputProps('type')}
    />
  );
};
