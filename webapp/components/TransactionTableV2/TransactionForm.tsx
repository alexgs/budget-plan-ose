/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Button, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import { useAllAccounts } from '../../client-lib/api/use-all-accounts';

export const FORM_ID = 'transaction-form';

interface Props {
  columnCount: number;
  onCancel: VoidFunction;
}

export const TransactionForm: React.FC<Props> = (props) => {
  // TODO Handle errors
  const { error: accountError, accounts } = useAllAccounts();
  let accountsList: { value: string; label: string }[] = [];
  if (accounts) {
    accountsList = accounts
      .map((account) => ({
        value: account.id,
        label: account.description,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
  const form = useForm({
    initialValues: {
      account: accountsList[0].value,
      categories: [''],
      date: new Date(),
      description: '',
      notes: '',
      credit: 0,
      debit: 0,
    },
  });

  function handleCancelClick() {
    // TODO Reset form state
    props.onCancel();
  }

  // TODO It will require some CSS finagling to turn off the border between rows
  // TODO Setting `padding-left: 0; padding-right: 5px` on the input cells
  return (
    <>
      <tr>
        <td />
        <td>
          <DatePicker
            allowFreeInput
            required
            form={FORM_ID}
            inputFormat="YYYY-MM-DD"
            {...form.getInputProps('date')}
          />
        </td>
        <td>
          <NativeSelect
            required
            data={accountsList}
            form={FORM_ID}
            {...form.getInputProps('account')}
          />
        </td>
        <td>
          <TextInput
            required
            form={FORM_ID}
            placeholder="Payee"
            {...form.getInputProps('description')}
          />
        </td>
        <td>{/* Category */}</td>
        <td>
          <TextInput
            required
            form={FORM_ID}
            placeholder="Notes"
            {...form.getInputProps('Notes')}
          />
        </td>
        <td>
          <NumberInput
            hideControls
            required
            decimalSeparator="."
            form={FORM_ID}
            precision={2}
            {...form.getInputProps('credit')}
          />
        </td>
        <td>
          <NumberInput
            hideControls
            required
            decimalSeparator="."
            form={FORM_ID}
            precision={2}
            {...form.getInputProps('debit')}
          />
        </td>
      </tr>
      <tr>
        <td colSpan={props.columnCount}>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </td>
      </tr>
    </>
  );
};
