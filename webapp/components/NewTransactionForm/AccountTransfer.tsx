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
import { SaveButton } from './Buttons';
import { AccountField, AmountField, CreditField } from './Fields';

interface Props {
  accounts: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSubmit: (values: NewTransactionFormValues) => void;
}

export const AccountTransfer: React.FC<Props> = (props) => {
  function renderAmounts() {
    return props.mantineForm.values.amounts.map((amount, index) => (
      <AmountContainer key={`amount.${index}`}>
        <AccountField
          accounts={props.accounts}
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
      <SplitAmount mantineForm={props.mantineForm} />
      {renderAmounts()}
      <Group position="apart">
        <SaveButton />
      </Group>
    </>
  );
};
