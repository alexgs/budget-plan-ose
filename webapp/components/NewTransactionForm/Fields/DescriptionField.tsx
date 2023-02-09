/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TextInput } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const DescriptionField: React.FC<Props> = (props) => (
  <TextInput
    label="Description"
    placeholder="Payee or payer"
    my="sm"
    required
    {...props.mantineForm.getInputProps('description')}
  />
);
