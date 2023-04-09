/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';
import { AmountInputCell } from './AmountInputCell';

interface Props {
  mantineForm: NewTransactionFormHook;
}

export const MainAmountCell: React.FC<Props> = (props) => {
  if (props.mantineForm.values.categories.length > 1) {
    return (
      <AmountInputCell
        checkboxInputProps={props.mantineForm.getInputProps(`isCredit`, {
          type: 'checkbox',
        })}
        isCredit={props.mantineForm.values.isCredit}
        numberInputProps={props.mantineForm.getInputProps(`balance`)}
      />
    );
  }

  return (
    <AmountInputCell
      checkboxInputProps={props.mantineForm.getInputProps(
        'categories.0.isCredit',
        { type: 'checkbox' }
      )}
      isCredit={props.mantineForm.values.categories[0].isCredit}
      numberInputProps={props.mantineForm.getInputProps(`categories.0.amount`)}
    />
  );
};
