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
import React from 'react';

import { formatAmount } from '../../client-lib';
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
  sumSubrecords,
} from '../../shared-lib';

function convertDepositFormValuesToRequestPayload(
  values: NewTransactionFormValues
): ApiSchema.NewTransaction {
  const categories: ApiSchema.NewCategorySubrecord[] = values.categories
    .filter((category) => category.amount !== 0)
    .map((category) => {
      return {
        amount: dollarsToCents(category.amount),
        categoryId: category.categoryId,
        isCredit: true,
      };
    });
  const { balance, isCredit, ...otherValues } = values;
  return {
    ...otherValues,
    categories,
    accounts: [
      {
        ...otherValues.accounts[0],
        amount: dollarsToCents(balance),
      },
    ],
    type: TRANSACTION_TYPES.DEPOSIT,
  };
}

function getInitialValues(
  accounts: { label: string; value: string }[],
  categories: CategoryValues[],
  data?: ApiSchema.UpdateTransaction
): NewTransactionFormValues {
  if (data) {
    const accounts = data.accounts.map((sub) => ({
      accountId: sub.accountId,
      amount: sub.amount / 100,
      isCredit: sub.isCredit,
      status: sub.status,
    }));
    const categorySubrecords = categories.map((category) => {
      const subrecord = data.categories.find(
        (sub) => sub.categoryId === category.id
      );
      if (subrecord) {
        const output: ApiSchema.UpdateCategorySubrecord = {
          amount: subrecord.amount / 100,
          categoryId: category.id,
          id: 'id' in subrecord ? subrecord.id : '',
          isCredit: subrecord.isCredit,
        };
        return output;
      }

      const output: ApiSchema.NewCategorySubrecord = {
        amount: 0,
        categoryId: category.id,
        isCredit: true as boolean,
      };
      return output;
    });
    const balance = sumSubrecords(categorySubrecords);
    const isCredit = balance >= 0;
    return {
      accounts,
      isCredit,
      balance: Math.abs(balance),
      categories: categorySubrecords,
      date: new Date(data.date),
      description: data.description,
      type: data.type as TransactionType,
    };
  }

  return {
    accounts: [
      {
        accountId: accounts[0].value,
        amount: 0,
        isCredit: true as boolean,
        status: AMOUNT_STATUS.PENDING,
      },
    ],
    balance: 0, // Client-only field
    categories: categories.map((category) => ({
      amount: 0,
      categoryId: category.id,
      isCredit: true as boolean,
    })),
    date: new Date(),
    description: '',
    isCredit: true as boolean, // Client-only field
    type: TRANSACTION_TYPES.PAYMENT as TransactionType,
  };
}

interface Props extends React.PropsWithChildren {
  accounts: { label: string; value: string }[];
  categories: CategoryValues[];
  data?: ApiSchema.UpdateTransaction;
  onSubmit: (
    values: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
  ) => void;
}

export const DepositForm: React.FC<Props> = (props) => {
  const form: NewTransactionFormHook = useForm({
    initialValues: getInitialValues(
      props.accounts,
      props.categories,
      props.data
    ),
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function handleSubmit(values: NewTransactionFormValues) {
    if (props.data?.id) {
      const payload: ApiSchema.UpdateTransaction = {
        ...convertDepositFormValuesToRequestPayload(values),
        id: props.data.id,
      };
      props.onSubmit(payload);
    } else {
      const payload: ApiSchema.NewTransaction =
        convertDepositFormValuesToRequestPayload(values);
      props.onSubmit(payload);
    }
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
