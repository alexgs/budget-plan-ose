/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faSplit } from '@fortawesome/pro-regular-svg-icons';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  CSSObject,
  Group,
  MantineTheme,
  NativeSelect,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FC } from 'react';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';
import {
  TRANSACTION_TYPES,
  getFriendlyTransactionType,
} from '../../shared-lib';

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

interface Props {
  accounts: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSplitClick: VoidFunction;
  onSubmit: (values: NewTransactionFormValues) => void;
}

export const SinglePaymentForm: FC<Props> = (props) => {
  const transactionTypeData = Object.values(TRANSACTION_TYPES).map((value) => {
    return {
      value,
      label: getFriendlyTransactionType(value),
    };
  });

  return (
    <form
      onSubmit={props.mantineForm.onSubmit(props.onSubmit, (values) =>
        console.error(values)
      )}
    >
      <DatePicker
        allowFreeInput
        inputFormat="YYYY-MM-DD"
        label="Date"
        my="sm"
        required
        {
          // I really dislike this syntax; it's too much magic
          ...props.mantineForm.getInputProps('date')
        }
      />
      <NativeSelect
        data={transactionTypeData}
        label="Type"
        my="sm"
        required
        {...props.mantineForm.getInputProps('type')}
      />
      <TextInput
        label="Description"
        placeholder="Payee or payer"
        my="sm"
        required
        {...props.mantineForm.getInputProps('description')}
      />
      <NativeSelect
        data={props.accounts}
        label="Account"
        my="sm"
        required
        {...props.mantineForm.getInputProps('amounts.0.accountId')}
      />
      <NativeSelect
        data={props.categories}
        label="Category"
        my="sm"
        required
        {...props.mantineForm.getInputProps('amounts.0.categoryId')}
      />
      <NumberInput
        decimalSeparator="."
        hideControls
        icon={<FontAwesomeIcon icon={faDollarSign} />}
        label="Amount"
        my="sm"
        precision={2}
        required
        sx={props.mantineForm.values.amounts[0].isCredit ? amountStyle : {}}
        {...props.mantineForm.getInputProps('amounts.0.amount')}
      />
      <Checkbox
        label="Credit or deposit"
        {...props.mantineForm.getInputProps('amounts.0.isCredit', {
          type: 'checkbox',
        })}
      />
      <Group position="apart">
        <Group position="left" mt="md">
          <Button onClick={props.onSplitClick} variant="outline">
            <FontAwesomeIcon icon={faSplit} size="lg" />
          </Button>
        </Group>
        <Group position="right" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Group>
    </form>
  );
};
