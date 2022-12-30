/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSObject, MantineTheme, NumberInput } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const AmountField: React.FC<Props> = (props) => (
  <NumberInput
    decimalSeparator="."
    hideControls
    icon={<FontAwesomeIcon icon={faDollarSign} />}
    label="Amount"
    my="sm"
    precision={2}
    required
    sx={props.mantineForm.values.amounts[0].isCredit ? amountStyle : {}}
    {...props.mantineForm.getInputProps('amounts.0.amount')}
  />

);
