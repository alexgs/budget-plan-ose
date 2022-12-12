/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
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
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FC, PropsWithChildren } from 'react';

import { formatAmount, formatClientDate } from '../../client-lib';
import { CategoryValues } from '../../client-lib/types';

interface CategoryAmount {
  amount: number;
  categoryId: string;
}

interface FormValues {
  accountId: string;
  amounts: { [id: string]: CategoryAmount };
  date: Date;
  description: string;
  totalAmount: number;
}

interface Props extends PropsWithChildren {
  accounts: { label: string; value: string }[];
  categories: CategoryValues[];
}

export const DepositForm: FC<Props> = (props) => {
  const initialAmounts = props.categories.reduce((output, current) => {
    return {
      ...output,
      [current.id]: {
        amount: 0,
        categoryId: current.id,
      },
    };
  }, {} as { [id: string]: CategoryAmount });

  const form = useForm<FormValues>({
    initialValues: {
      amounts: initialAmounts,
      accountId: props.accounts[0].value,
      date: new Date(),
      description: '',
      totalAmount: 0,
    },
  });

  function handleSubmit(values: FormValues) {
    // TODO Display a loading modal
    void requestDeposit(values);
  }

  async function requestDeposit(values: FormValues) {
    const amounts = Object.values(values.amounts)
      .filter((amount) => amount.amount !== 0)
      .map((amount) => {
        return {
          accountId: values.accountId,
          amount: Math.round(amount.amount * 100), // TODO Make this change in other txn form(s)
          categoryId: amount.categoryId,
          isCredit: true,
          status: 'pending',
        };
      });
    const payload = {
      amounts,
      date: formatClientDate(values.date),
      description: values.description,
      type: 'payment', // TODO Should this be "deposit" to better reflect the intent of this "event"?
    };
    console.log(payload);

    const responseData = await fetch('/api/transactions', {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .catch((e) => {
        console.error(e);
        showNotification({
          color: 'red',
          message: 'Something went wrong! Please check the logs.',
          title: 'Error',
        });
      });

    showNotification({
      message: `Saved deposit "${responseData.description}"`,
      title: 'Success',
    });
  }

  function sumAllocations(): number {
    const allocations: CategoryAmount[] = Object.values(form.values.amounts);
    return allocations.reduce((output, current) => output + current.amount, 0);
  }

  const rows = props.categories.map((row) => {
    const input = row.isLeaf ? (
      <NumberInput
        decimalSeparator="."
        hideControls
        precision={2}
        {...form.getInputProps(`amounts.${row.id}.amount`)}
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

  const amountRemaining = form.values.totalAmount - sumAllocations();
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
        {
          // I really dislike this syntax; it's too much magic
          ...form.getInputProps('date')
        }
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
        {...form.getInputProps('accountId')}
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
          {...form.getInputProps('totalAmount')}
        />
        <div style={{ width: '45%' }}>
          Amount Remaining: {formatAmount(amountRemaining * 100)}
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
