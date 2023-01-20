/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  accounts: { label: string; value: string }[];
  index?: number;
  mantineForm: NewTransactionFormHook;
  onAccountChange?: (accountId: string) => void;
}

export const AccountField: React.FC<Props> = (props) => {
  const index = props.index ?? 0;
  const fieldPath = `amounts.${index}.accountId`;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value;
    if (props.onAccountChange) {
      props.onAccountChange(value);
    }
    props.mantineForm.setFieldValue(fieldPath, value);
  }

  return (
    <NativeSelect
      data={props.accounts}
      label="Account"
      my="sm"
      required
      {...props.mantineForm.getInputProps(fieldPath)}
      onChange={handleChange}
    />
  );
};
