/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { faFloppyDisk, faSplit } from '@fortawesome/pro-regular-svg-icons';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Loader,
  NumberInput,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';

import { formatAmount } from '../../../client-lib';
import { NewTransactionFormHook } from '../../../client-lib/types';
import {
  Account,
  Category,
  dollarsToCents,
  sumSubrecords
} from '../../../shared-lib';
import { amountStyle } from '../../NewTransactionForm/Amounts/amount-style';
import {
  AccountField,
  AmountField,
  CategoryField,
  CreditField,
} from '../BuildingBlocks';

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

interface Props {
  accountData: Account[];
  categoryData: Category[];
  isSaving: boolean;
  mantineForm: NewTransactionFormHook;
  onAccountChange: (accountId: string) => void;
  onSplitAccount: VoidFunction;
  onSplitCategory: VoidFunction;
}

export const SplitFormRow: React.FC<Props> = (props) => {
  function calcAmountRemaining() {
    if (props.mantineForm.values.isCredit) {
      return (
        props.mantineForm.values.balance -
        sumSubrecords(props.mantineForm.values.categories)
      );
    }
    return (
      props.mantineForm.values.balance +
      sumSubrecords(props.mantineForm.values.categories)
    );
  }

  function renderSubrecordRows() {
    return props.mantineForm.values.categories.map((subrecord, index) => {
      const splitButton =
        index === props.mantineForm.values.categories.length - 1 ? (
          <Button compact onClick={props.onSplitCategory} variant="subtle">
            <FontAwesomeIcon icon={faSplit} />
            &nbsp; Split
          </Button>
        ) : null;
      return (
        <tr key={`subrecord-${index}`}>
          <td colSpan={4} />
          <td style={{ textAlign: 'center' }}>
            <CategoryField
              categoryData={props.categoryData}
              index={index}
              mantineForm={props.mantineForm}
            />
            {splitButton}
          </td>
          <td>{/* Notes */}</td>
          <td>
            <AmountField
              index={index}
              mantineForm={props.mantineForm}
              subrecordType={'category'}
            />
            <CreditField
              index={index}
              mantineForm={props.mantineForm}
              subrecordType={'category'}
            />
          </td>
          <td>{/* Buttons */}</td>
        </tr>
      );
    });
  }

  if (props.isSaving) {
    return (
      <tr>
        <td colSpan={8} style={{ textAlign: 'center' }}>
          <Loader variant="bars" />
        </td>
      </tr>
    );
  }

  return (
    <>
      <tr>
        <td>{/* Checkbox, maybe other controls */}</td>
        <td>
          <DatePicker
            allowFreeInput
            inputFormat="YYYY-MM-DD"
            my="sm"
            required
            {...props.mantineForm.getInputProps('date')}
          />
        </td>
        <td>
          <AccountField
            accountData={props.accountData}
            mantineForm={props.mantineForm}
            onAccountChange={props.onAccountChange}
          />
        </td>
        <td>
          <TextInput
            placeholder="Payee"
            my="sm"
            required
            {...props.mantineForm.getInputProps('description')}
          />
        </td>
        <td>
          <AmountRemainingLabel>Amount Remaining:</AmountRemainingLabel>
          <AmountRemainingAmount>
            {formatAmount(dollarsToCents(calcAmountRemaining()))}
          </AmountRemainingAmount>
        </td>
        <td>{/* Notes */}</td>
        <td>
          <NumberInput
            decimalSeparator="."
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            my="sm"
            precision={2}
            required
            sx={props.mantineForm.values.isCredit ? amountStyle : {}}
            {...props.mantineForm.getInputProps('balance')}
          />
          <Checkbox
            label="Credit or deposit"
            {...props.mantineForm.getInputProps('isCredit', {
              type: 'checkbox',
            })}
          />
        </td>
        <td>
          <UnstyledButton type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </UnstyledButton>
        </td>
      </tr>
      {renderSubrecordRows()}
    </>
  );
};