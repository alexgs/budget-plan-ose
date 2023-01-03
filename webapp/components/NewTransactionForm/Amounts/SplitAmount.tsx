/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group, NumberInput } from '@mantine/core';
import React from 'react';

import { formatAmount } from '../../../client-lib';
import { NewTransactionFormHook } from '../../../client-lib/types';

import { amountStyle } from './amount-style';

// TODO Use a `NumberInput` here and format it like the "Total Amount" field
const AmountRemainingAmount = styled.div({
  backgroundColor: 'rgb(37, 38, 43)',
  border: 'solid rgb(55, 58, 64) 1px',
  borderRadius: 3,
  fontSize: 14,
  padding: '6px 12px',
});

const AmountRemainingLabel = styled.div({
  fontSize: 14,
});

/**
 * Takes a bunch of values from the form and returns their sum. The output is
 * negative for debits and positive for credits.
 */
const sumAmounts = (form: NewTransactionFormHook): number => {
  const allocations = Object.values(form.values.amounts);
  return allocations.reduce((output, current) => {
    if (current.isCredit) {
      return output + current.amount;
    }
    return output - current.amount;
  }, 0);
};

interface Props {
  lockBalance?: boolean;
  mantineForm: NewTransactionFormHook;
}

export const SplitAmount: React.FC<Props> = (props) => {
  function calcAmountRemaining() {
    if (props.mantineForm.values.isCredit) {
      return props.mantineForm.values.balance - sumAmounts(props.mantineForm);
    }
    return props.mantineForm.values.balance + sumAmounts(props.mantineForm);
  }

  return (
    <>
      <Group position="apart">
        <NumberInput
          decimalSeparator="."
          disabled={props.lockBalance}
          hideControls
          icon={<FontAwesomeIcon icon={faDollarSign} />}
          label="Total Amount"
          my="sm"
          precision={2}
          required
          style={{ width: '45%' }}
          sx={props.mantineForm.values.isCredit ? amountStyle : {}}
          {...props.mantineForm.getInputProps('balance')}
        />
        <div style={{ width: '45%' }}>
          <AmountRemainingLabel>Amount Remaining:</AmountRemainingLabel>
          <AmountRemainingAmount>
            {formatAmount(calcAmountRemaining() * 100)}
          </AmountRemainingAmount>
        </div>
      </Group>
    </>
  );
};
