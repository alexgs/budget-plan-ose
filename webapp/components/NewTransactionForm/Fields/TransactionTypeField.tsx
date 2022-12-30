/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect } from '@mantine/core';
import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';
import {
  getFriendlyTransactionType,
  TRANSACTION_TYPES,
} from '../../../shared-lib';

const transactionTypeData = Object.values(TRANSACTION_TYPES).map((value) => {
  return {
    value,
    label: getFriendlyTransactionType(value),
  };
});

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const TransactionTypeField: React.FC<Props> = (props) => (
  <NativeSelect
    data={transactionTypeData}
    label="Type"
    my="sm"
    required
    {...props.mantineForm.getInputProps('type')}
  />
);
