/*
 * Copyright 2022-23 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Group } from '@mantine/core';
import React from 'react';

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
} from './Fields';

interface Props {
  categories: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSplitClick: VoidFunction;
}

export const CategoryTransfer: React.FC<Props> = (props) => {
  function renderAmounts() {
    return props.mantineForm.values.amounts.map((amount, index) => (
      <AmountContainer key={`amount.${index}`}>
        <CategoryField
          categories={props.categories}
          mantineForm={props.mantineForm}
        />
        <AmountField index={index} mantineForm={props.mantineForm} />
        <CreditField index={index} mantineForm={props.mantineForm} />
      </AmountContainer>
    ));
  }

  return (
    <>
      <SplitAmount mantineForm={props.mantineForm} />
      {renderAmounts()}
      <Group position="apart">
        <SplitButton onSplitClick={props.onSplitClick} />
        <SaveButton />
      </Group>
    </>
  );
};
