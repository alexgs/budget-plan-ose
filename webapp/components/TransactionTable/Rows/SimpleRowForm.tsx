/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, UseFormReturnType, yupResolver } from '@mantine/form';
import React from 'react';

import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  ApiSchema,
  TransactionType,
  getFriendlyAccountName,
  getFriendlyCategoryName,
  schemaObjects,
} from '../../../shared-lib';
import {
  AccountCell,
  ButtonsCell,
  CategoryCell,
  ChevronCell,
  DateCell,
  DescriptionCell,
  NotesCell,
} from '../Components/Cell';
import { Row } from '../Components/Row';
import { SmartAmountCell } from '../Components/SmartAmountCell';

import { RowProps } from './row-props';

interface Props extends Omit<RowProps, 'txn'> {
  data?: ApiSchema.UpdateTransaction;
}

export const SimpleRowForm: React.FC<Props> = (props) => {
  const form: UseFormReturnType<ApiSchema.NewTransaction> = useForm({
    initialValues: {
      accounts: [
        {
          accountId:
            props.data?.accounts[0].accountId ?? props.accountData[0].id,
          amount: props.data?.accounts[0].amount ?? 0,
          isCredit: props.data?.accounts[0].isCredit ?? (false as boolean),
          status: props.data?.accounts[0].status ?? AMOUNT_STATUS.PENDING,
        },
      ],
      categories: [
        {
          amount: props.data?.categories[0].amount ?? 0,
          categoryId:
            props.data?.categories[0].categoryId ?? props.categoryData[0].id,
          isCredit: props.data?.categories[0].isCredit ?? (false as boolean),
        },
      ],
      date: props.data?.date ?? new Date(),
      description: props.data?.description ?? '',
      type: props.data?.type ?? (TRANSACTION_TYPES.PAYMENT as TransactionType),
    },
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function handleSubmit() {}

  const accounts = props.accountData.map((account) => ({
    value: account.id,
    label: account.description,
  }));
  const key = props.data ? props.data.id : 'new-txn';
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.error(values))}
    >
      <Row key={key}>
        <ChevronCell>{/* Checkbox */}</ChevronCell>
        <DateCell>
          <DatePicker
            allowFreeInput
            inputFormat="YYYY-MM-DD"
            my="sm"
            required
            {...form.getInputProps('date')}
          />
        </DateCell>
        <AccountCell>
          <NativeSelect
            data={accounts}
            my="sm"
            required
            {...form.getInputProps('accounts.0.accountId')}
          />
        </AccountCell>
      </Row>
    </form>
  );
};
