/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader, TextInput, UnstyledButton } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';

import { NewTransactionFormHook } from '../../../client-lib/types';
import { Account, Category } from '../../../shared-lib';
import {
  AccountField,
  AmountField,
  CategoryField,
  CreditField
} from '../BuildingBlocks';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  isSaving: boolean;
  mantineForm: NewTransactionFormHook;
  onAccountChange: (accountId: string) => void;
  onSplitAccount: VoidFunction;
  onSplitCategory: VoidFunction;
}

export const FormRow: React.FC<Props> = (props) => {
  if (props.isSaving) {
    return (
      <tr><td colSpan={8} style={{ textAlign: 'center'}}>
        <Loader variant="bars" />
      </td></tr>
    )
  }

  return (
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
        <CategoryField
          categoryData={props.categoryData}
          mantineForm={props.mantineForm}
        />
      </td>
      <td>{/* Notes */}</td>
      <td>
        <AmountField
          mantineForm={props.mantineForm}
          subrecordType={'category'}
        />
        <CreditField mantineForm={props.mantineForm} subrecordType={'category'} />
      </td>
      <td>
        <UnstyledButton type="submit">
          <FontAwesomeIcon icon={faFloppyDisk} />
        </UnstyledButton>

      </td>
    </tr>
  );
};
