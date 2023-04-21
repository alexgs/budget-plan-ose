/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, CSSObject, MantineTheme, NumberInput } from '@mantine/core';
import React from 'react';
import { AmountCell } from './Cell';

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

interface Props {
  checkboxInputProps: any;
  isCredit: boolean;
  numberInputProps: any;
}

export const AmountInputCell: React.FC<Props> = (props) => {
  return (
    <AmountCell style={{ display: 'flex', alignItems: 'center' }}>
      <NumberInput
        decimalSeparator="."
        hideControls
        icon={<FontAwesomeIcon icon={faDollarSign} />}
        precision={2}
        required
        sx={props.isCredit ? amountStyle : {}}
        {...props.numberInputProps}
      />
      <Checkbox
        label="Credit"
        {...props.checkboxInputProps}
      />
    </AmountCell>
  );
};
