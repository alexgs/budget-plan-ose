/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Checkbox } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  index?: number;
  mantineForm: NewTransactionFormHook;
  subrecordType: 'account' | 'category';
}

export const CreditField: React.FC<Props> = (props) => {
  const index = props.index ?? 0;
  const subrecordType =
    props.subrecordType === 'account' ? 'accounts' : 'categories';
  return (
    <Checkbox
      label="Credit"
      {...props.mantineForm.getInputProps(`${subrecordType}.${index}.isCredit`, {
        type: 'checkbox',
      })}
    />
  );
};
