/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { DatePicker } from '@mantine/dates';
import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const DateField: React.FC<Props> = (props) => (
  <DatePicker
    allowFreeInput
    inputFormat="YYYY-MM-DD"
    label="Date"
    my="sm"
    required
    {...props.mantineForm.getInputProps('date')}
  />
);
