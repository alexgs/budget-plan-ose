/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Button, NumberInput, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';

export const FORM_ID = 'transaction-form';

interface Props {
  columnCount: number;
  onCancel: VoidFunction;
}

export const TransactionForm: React.FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      account: '',
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
        <td>{/* Account */}</td>
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
