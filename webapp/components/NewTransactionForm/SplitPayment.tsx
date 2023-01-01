/*
 * Copyright 2022-23 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Group, NumberInput } from '@mantine/core';
import { FC } from 'react';

import { formatAmount } from '../../client-lib';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';

import {
  AmountContainer,
  AmountRemainingAmount,
  AmountRemainingLabel,
  amountStyle,
  sumAmounts,
} from './Amounts';
import { SaveButton, SplitButton } from './Buttons';
import {
  AccountField,
  AmountField,
  CategoryField,
  CreditField,
  DescriptionField,
} from './Fields';

// TODO This is good for me (who isn't colorblind), but we should add a '+' or
//   '-' prefix (or maybe some other FontAwesome icon) so there's another visual
//   indicator, too.

interface Props {
  accounts: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSplitClick: VoidFunction;
  onSubmit: (values: NewTransactionFormValues) => void;
}

export const SplitPayment: FC<Props> = (props) => {
  function calcAmountRemaining() {
    if (props.mantineForm.values.isCredit) {
      return props.mantineForm.values.balance - sumAmounts(props.mantineForm);
    }
    return props.mantineForm.values.balance + sumAmounts(props.mantineForm);
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
        <CreditField index={index} mantineForm={props.mantineForm} />
      </AmountContainer>
    ));
  }

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
            {formatAmount(calcAmountRemaining() * 100)}
          </AmountRemainingAmount>
        </div>
      </Group>
      <Checkbox
        label="Credit or deposit"
        {...props.mantineForm.getInputProps('isCredit', { type: 'checkbox' })}
      />
      {renderAmounts()}
      <Group position="apart">
        <SplitButton onSplitClick={props.onSplitClick} />
        <SaveButton />
      </Group>
    </>
  );
};
