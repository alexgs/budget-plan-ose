/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSObject, Group, MantineTheme, NumberInput } from '@mantine/core';
import { FC } from 'react';

import { formatAmount } from '../../client-lib';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';
import { space } from '../tokens';

import { SaveButton, SplitButton } from './Buttons';
import {
  AccountField,
  AmountField,
  CategoryField,
  DescriptionField,
} from './Fields';

const AmountContainer = styled.div({
  marginTop: space.lg,
});

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

// TODO This is good for me (who isn't colorblind), but we should add a '+' or
//   '-' prefix (or maybe some other FontAwesome icon) so there's another visual
//   indicator, too.

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

interface Props {
  accounts: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSplitClick: VoidFunction;
  onSubmit: (values: NewTransactionFormValues) => void;
}

export const SplitPayment: FC<Props> = (props) => {
  function sumAllocations(): number {
    const allocations = Object.values(props.mantineForm.values.amounts);
    return allocations.reduce((output, current) => output + current.amount, 0);
  }

  function renderAmounts() {
    return props.mantineForm.values.amounts.map((amount, index) => (
      <AmountContainer key={`amount.${index}`}>
        <AccountField
          accounts={props.accounts}
          index={index}
          mantineForm={props.mantineForm}
        />
        <CategoryField
          categories={props.categories}
          index={index}
          mantineForm={props.mantineForm}
        />
        <AmountField index={index} mantineForm={props.mantineForm} />
        {/*
        TODO Credits don't work correctly on the split form, so disable them for now
        <CreditField index={index} mantineForm={props.mantineForm} />
        */}
      </AmountContainer>
    ));
  }

  const amountRemaining = props.mantineForm.values.balance - sumAllocations();
  return (
    <>
      <DescriptionField mantineForm={props.mantineForm} />
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
            {formatAmount(amountRemaining * 100)}
          </AmountRemainingAmount>
        </div>
      </Group>
      {/*
      TODO Credits don't work correctly on the split form (see above)
      <Checkbox
        label="Credit or deposit"
        {...props.mantineForm.getInputProps('isCredit', { type: 'checkbox' })}
      />
      */}
      {renderAmounts()}
      <Group position="apart">
        <SplitButton onSplitClick={props.onSplitClick} />
        <SaveButton />
      </Group>
    </>
  );
};
