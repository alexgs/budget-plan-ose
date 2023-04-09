/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, CSSObject, MantineTheme, NumberInput } from '@mantine/core';
import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';

import { AmountCell } from './Cell';

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const MainAmountCell: React.FC<Props> = (props) => {
  if (props.mantineForm.values.categories.length > 1) {
    return (
      <AmountCell style={{ display: 'flex', alignItems: 'center' }}>
        <NumberInput
          decimalSeparator="."
          hideControls
          icon={<FontAwesomeIcon icon={faDollarSign} />}
          precision={2}
          required
          sx={props.mantineForm.values.isCredit ? amountStyle : {}}
          {...props.mantineForm.getInputProps(`balance`)}
        />
        <Checkbox
          label="Credit"
          {...props.mantineForm.getInputProps('isCredit', {
            type: 'checkbox',
          })}
        />
      </AmountCell>
    );
  }

  return (
    <AmountCell style={{ display: 'flex', alignItems: 'center' }}>
      <NumberInput
        decimalSeparator="."
        hideControls
        icon={<FontAwesomeIcon icon={faDollarSign} />}
        precision={2}
        required
        sx={props.mantineForm.values.categories[0].isCredit ? amountStyle : {}}
        {...props.mantineForm.getInputProps(`categories.0.amount`)}
      />
      <Checkbox
        label="Credit"
        {...props.mantineForm.getInputProps('categories.0.isCredit', {
          type: 'checkbox',
        })}
      />
    </AmountCell>
  );
};
