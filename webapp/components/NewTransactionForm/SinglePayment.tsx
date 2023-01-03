/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Group } from '@mantine/core';
import { FC } from 'react';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';

import { SaveButton, SplitButton } from './Buttons';
import {
  AccountField,
  AmountField,
  CategoryField,
  CreditField,
  DescriptionField,
} from './Fields';

interface Props {
  accounts: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSplitClick: VoidFunction;
}

export const SinglePayment: FC<Props> = (props) => {
  return (
    <>
      <DescriptionField mantineForm={props.mantineForm} />
      <AccountField accounts={props.accounts} mantineForm={props.mantineForm} />
      <CategoryField
        categories={props.categories}
        mantineForm={props.mantineForm}
      />
      <AmountField mantineForm={props.mantineForm} />
      <CreditField mantineForm={props.mantineForm} />
      <Group position="apart">
        <SplitButton onSplitClick={props.onSplitClick} />
        <SaveButton />
      </Group>
    </>
  );
};
