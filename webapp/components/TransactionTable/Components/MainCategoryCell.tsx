/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import React from 'react';

import { formatAmount } from '../../../client-lib';
import { NewTransactionFormHook } from '../../../client-lib/types';
import { Category, dollarsToCents, sumSubrecords } from '../../../shared-lib';
import { space } from '../../tokens';

import { CategoryField } from './CategoryField';
import { CategoryCell } from './Cell';

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
  marginRight: space.sm,
});

function calcAmountRemaining(form: NewTransactionFormHook) {
  if (form.values.isCredit) {
    return (
      form.values.balance -
      sumSubrecords(form.values.categories)
    );
  }
  return (
    form.values.balance +
    sumSubrecords(form.values.categories)
  );
}

interface Props {
  categoryData: Category[];
  mantineForm: NewTransactionFormHook;
}

export const MainCategoryCell: React.FC<Props> = (props) => {
  if (props.mantineForm.values.categories.length > 1) {
    return (
      <CategoryCell style={{display: 'flex', alignItems: 'center'}}>
        <AmountRemainingLabel>Amount Remaining:</AmountRemainingLabel>
        <AmountRemainingAmount>
          {formatAmount(dollarsToCents(calcAmountRemaining(props.mantineForm)))}
        </AmountRemainingAmount>
      </CategoryCell>
    )
  }

  return (
    <CategoryCell>
      <CategoryField
        categoryData={props.categoryData}
        {...props.mantineForm.getInputProps(`categories.0.categoryId`)}
      />
    </CategoryCell>
  );
};
