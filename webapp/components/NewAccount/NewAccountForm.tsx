/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Group, NativeSelect, Space, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React from 'react';
import * as yup from 'yup';
import { getFriendlyAccountType } from '../../shared-lib';
import { ACCOUNT_TYPES } from '../../shared-lib/constants';

export const newAccountSchema = yup.object({
  description: yup.string().required(),
  type: yup.string().required(),
});

interface Props {
  onClose: VoidFunction;
}

export const NewAccountForm: React.FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      description: '',
      type: ACCOUNT_TYPES.CHECKING,
    },
    validate: yupResolver(newAccountSchema),
    validateInputOnChange: true,
  });

  // TODO
  const isSaveButtonEnabled = true;

  function handleSubmit(values: Record<string, string>) {
    // TODO
  }

  const accountTypeData = Object.values(ACCOUNT_TYPES).map((value) => {
    return {
      value,
      label: getFriendlyAccountType(value),
    };
  });

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.error(values))}
    >
      <TextInput
        label="Description"
        placeholder="My awesome account"
        my="sm"
        required
        {...form.getInputProps('description')}
      />
      <NativeSelect
        data={accountTypeData}
        label="Type"
        my="sm"
        required
        {...form.getInputProps('type')}
      />
      <Space h="xl" />
      <Group position="apart">
        <Button color="pink.3" onClick={props.onClose} variant="outline">
          Cancel
        </Button>
        <Button
          color="green.6"
          disabled={!isSaveButtonEnabled}
          type="submit"
          variant="outline"
        >
          Save
        </Button>
      </Group>
    </form>
  );
};
