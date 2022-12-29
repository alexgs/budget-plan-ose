/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Group, NativeSelect, Space, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React from 'react';
import * as yup from 'yup';
import { FinancialAccount } from '../../client-lib/types';
import { getFriendlyAccountType } from '../../shared-lib';
import { ACCOUNT_TYPES } from '../../shared-lib/constants';
import { NewAccountData } from './NewAccountButton';

export const newAccountSchema = yup.object({
  accountType: yup.string().required(),
  description: yup.string().required(),
});

interface Props {
  data?: FinancialAccount;
  onCancel: VoidFunction;
  onSave: (values: NewAccountData) => void;
}

export const NewAccountForm: React.FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      accountType: props.data?.accountType ?? ACCOUNT_TYPES.CHECKING,
      description: props.data?.description ?? '',
    },
    validate: yupResolver(newAccountSchema),
    validateInputOnChange: true,
  });

  const isSaveButtonEnabled =
    form.values.description.length > 0 && Object.keys(form.errors).length === 0;

  function handleSubmit(values: NewAccountData) {
    props.onSave(values);
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
        {...form.getInputProps('accountType')}
      />
      <Space h="xl" />
      <Group position="apart">
        <Button color="pink.3" onClick={props.onCancel} variant="outline">
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
