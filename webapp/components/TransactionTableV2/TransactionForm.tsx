/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

interface Props {
  columnCount: number;
  onCancel: VoidFunction;
}

export const TransactionForm: React.FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      email: '',
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
          <TextInput
            withAsterisk
            form="new-txn-form"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
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
