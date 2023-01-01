/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSObject, Group, MantineTheme, NumberInput } from '@mantine/core';
import { formatAmount } from '../../client-lib';
import { NewTransactionFormHook } from '../../client-lib/types';
import { space } from '../tokens';

export const AmountContainer = styled.div({
  marginTop: space.lg,
});

// TODO Use a `NumberInput` here and format it like the "Total Amount" field
export const AmountRemainingAmount = styled.div({
  backgroundColor: 'rgb(37, 38, 43)',
  border: 'solid rgb(55, 58, 64) 1px',
  borderRadius: 3,
  fontSize: 14,
  padding: '6px 12px',
});

export const AmountRemainingLabel = styled.div({
  fontSize: 14,
});

export const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

/**
 * Takes a bunch of values from the form and returns their sum. The output is
 * negative for debits and positive for credits.
 */
export const sumAmounts = (form: NewTransactionFormHook): number => {
  const allocations = Object.values(form.values.amounts);
  return allocations.reduce((output, current) => {
    if (current.isCredit) {
      return output + current.amount;
    }
    return output - current.amount;
  }, 0);
};

interface Props {
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
