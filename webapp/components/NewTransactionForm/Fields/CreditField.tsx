/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Checkbox } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  index?: number;
  mantineForm: NewTransactionFormHook;
}

export const CreditField: React.FC<Props> = (props) => {
  const index = props.index ?? 0;
  return (
    <Checkbox
      label="Credit or deposit"
      {...props.mantineForm.getInputProps(`amounts.${index}.isCredit`, {
        type: 'checkbox',
      })}
    />
  );
};
