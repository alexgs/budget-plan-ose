/*
 * Copyright 2022-23 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Checkbox, Group } from '@mantine/core';
import { FC } from 'react';

import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';

import { AmountContainer, SplitAmount } from './Amounts';
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
      <SplitAmount mantineForm={props.mantineForm} />
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
