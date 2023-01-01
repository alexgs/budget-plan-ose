/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { CSSObject, MantineTheme } from '@mantine/core';
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
