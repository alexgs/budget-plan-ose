/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect } from '@mantine/core';
import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';
import { EXTRA_ACCOUNT_OPTIONS } from '../constants';
import { Account } from '../../../shared-lib';

interface Props {
  accountData: Account[];
  enableTransferOptions?: boolean;
  index?: number;
  mantineForm: NewTransactionFormHook;
  onAccountChange?: (accountId: string) => void;
}

export const AccountField: React.FC<Props> = (props) => {
  const accounts = props.accountData
    .map((account) => ({
      value: account.id,
      label: account.description,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const enableTransferOptions = props.enableTransferOptions ?? true;
  if (enableTransferOptions) {
    accounts.unshift(
      {
        label: 'Account transfer',
        value: EXTRA_ACCOUNT_OPTIONS.ACCOUNT_TRANSFER,
      },
      {
        label: 'Category transfer',
        value: EXTRA_ACCOUNT_OPTIONS.CATEGORY_TRANSFER,
      }
    );
  }

  const index = props.index ?? 0;
  const fieldPath = `accounts.${index}.accountId`;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value;
    props.mantineForm.setFieldValue(fieldPath, value);
    if (props.onAccountChange) {
      props.onAccountChange(value);
    }
  }

  return (
    <NativeSelect
      data={accounts}
      required
      {...props.mantineForm.getInputProps(fieldPath)}
      onChange={handleChange}
    />
  );
};
