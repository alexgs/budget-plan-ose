/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { DatePicker } from '@mantine/dates';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

import { Account, Category } from '../../../shared-lib';
import { AccountField } from '../BuildingBlocks/AccountField';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  mantineForm: NewTransactionFormHook;
  onSplitAccount: VoidFunction;
  onSplitCategory: VoidFunction;
}

export const FormRow: React.FC<Props> = (props) => {
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
        />
      </td>
      <td>{/* Description */}</td>
      <td>{/* Category */}</td>
      <td>{/* Notes */}</td>
      <td>{/* Amount */}</td>
      <td>{/* Status icons and other controls */}</td>
    </tr>
  );
};
