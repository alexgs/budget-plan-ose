/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React from 'react';

import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  Account,
  ApiSchema,
  Category,
  TransactionType,
  schemaObjects,
} from '../../shared-lib';

import {
  AccountTransferRow,
  BasicRow,
  CategoryTransferRow,
  SplitAccountRow,
  SplitCategoryRow,
} from './Rows';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTable: React.FC<Props> = (props) => {
  const form: NewTransactionFormHook = useForm({
    initialValues: {
      accounts: [
        {
          accountId: props.accountData[0].id,
          amount: 0,
          isCredit: false as boolean,
          status: AMOUNT_STATUS.PENDING,
        },
      ],
      balance: 0, // Client-only field
      categories: [
        {
          amount: 0,
          categoryId: props.categoryData[0].id,
          isCredit: false as boolean,
        },
      ],
      date: new Date(),
      description: '',
      isCredit: false as boolean, // Client-only field
      type: TRANSACTION_TYPES.PAYMENT as TransactionType,
    },
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function handleSubmit(values: NewTransactionFormValues) {
    // TODO Display a loading modal
    const { balance, isCredit, ...record } = values;
  }

  function renderRows() {
    return props.txnData.map((txn) => {
      if (txn.accounts.length === 1 && txn.categories.length > 1) {
        return (
          <SplitCategoryRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.accounts.length > 1 && txn.categories.length === 1) {
        return (
          <SplitAccountRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
        return (
          <AccountTransferRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
        return (
          <CategoryTransferRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      // Default option
      return (
        <BasicRow
          key={txn.id}
          accountData={props.accountData}
          categoryData={props.categoryData}
          txn={txn}
        />
      );
    });
  }

  function renderTopRow() {
    return (
      <tr>
        <td colSpan={8}>Add new transaction</td>
      </tr>
    );
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.error(values))}
    >
      <Table>
        <thead>
          <tr>
            <th />{/* Checkbox, maybe other controls */}
            <th>Date</th>
            <th>Account</th>
            <th>Description</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Amount</th>
            <th />{/* Status icons (pending, cleared, etc.), maybe other controls */}
          </tr>
        </thead>
        <tbody>
          {renderTopRow()}
          {renderRows()}
        </tbody>
      </Table>
    </form>
  );
};
