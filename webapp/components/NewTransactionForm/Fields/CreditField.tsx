/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Checkbox } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const CreditField: React.FC<Props> = (props) => (
  <Checkbox
    label="Credit or deposit"
    {...props.mantineForm.getInputProps('amounts.0.isCredit', {
      type: 'checkbox',
    })}
  />
);
