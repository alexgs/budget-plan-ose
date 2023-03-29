/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  Button,
  Group,
  NativeSelect,
  NumberInput,
  Table,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FC, PropsWithChildren } from 'react';

import { formatAmount, formatClientDate } from '../../client-lib';
import {
  CategoryValues,
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  ApiSchema,
  TransactionType,
  dollarsToCents,
  schemaObjects,
} from '../../shared-lib';

interface Props extends PropsWithChildren {
  accounts: { label: string; value: string }[];
  categories: CategoryValues[];
  data?: ApiSchema.NewTransaction;
  onSubmit: (values: NewTransactionFormValues) => Promise<void>;
}

export const DepositForm: FC<Props> = (props) => {
  const initialValues = props.data ? {
    ...props.data,
    balance: props.data.accounts[0].amount, // Client-only field
    isCredit: true as boolean, // Client-only field
  } : {
    accounts: [
      {
        accountId: props.accounts[0].value,
        amount: 0,
        isCredit: true as boolean,
        status: AMOUNT_STATUS.PENDING,
      },
    ],
    balance: 0, // Client-only field
    categories: props.categories.map((category) => ({
      amount: 0,
      categoryId: category.id,
      isCredit: true as boolean,
    })),
    date: new Date(),
    description: '',
    isCredit: true as boolean, // Client-only field
    type: TRANSACTION_TYPES.PAYMENT as TransactionType,
  };
  const form: NewTransactionFormHook = useForm({
    initialValues,
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function handleSubmit(values: NewTransactionFormValues) {
    // TODO Display a loading modal
    void props.onSubmit(values);
  }


  function sumAllocations(): number {
    return form.values.categories.reduce(
      (output, current) => output + current.amount,
      0
    );
  }

  const rows = props.categories.map((row, index) => {
    const input = row.isLeaf ? (
      <NumberInput
        decimalSeparator="."
        hideControls
        precision={2}
        {...form.getInputProps(`categories.${index}.amount`)}
      />
    ) : null;
    return (
      <tr key={row.id}>
        <td style={{ paddingLeft: 10 + 16 * row.depth }}>{row.label}</td>
        <td>{formatAmount(row.balance)}</td>
        <td>{input}</td>
      </tr>
    );
  });

  const amountRemaining = form.values.balance - sumAllocations();
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.error(values))}
    >
      <DatePicker
        allowFreeInput
        inputFormat="YYYY-MM-DD"
        label="Date"
        my="sm"
        required
        {...form.getInputProps('date')}
      />
      <TextInput
        label="Description"
        placeholder="Payer"
        my="sm"
        required
        {...form.getInputProps('description')}
      />
      <NativeSelect
        data={props.accounts}
        label="Account"
        my="sm"
        required
        {...form.getInputProps('accounts.0.accountId')}
      />
      <Group position="apart">
        <NumberInput
          decimalSeparator="."
          hideControls
          label="Total Amount"
          my="sm"
          precision={2}
          required
          style={{ width: '45%' }}
          {...form.getInputProps('balance')}
        />
        <div style={{ width: '45%' }}>
          Amount Remaining: {formatAmount(dollarsToCents(amountRemaining))}
        </div>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Current Balance</th>
            <th>Deposit Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Group position="right" mt="md">
        <Button disabled={amountRemaining !== 0} type="submit">
          Save
        </Button>
      </Group>
    </form>
  );
};
