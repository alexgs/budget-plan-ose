/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Table } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { formatClientDate } from '../../client-lib';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';
import {
  ACCOUNT_TYPES,
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  Account,
  AccountType,
  ApiSchema,
  Category,
  TransactionType,
  dollarsToCents,
  schemaObjects,
} from '../../shared-lib';

import {
  AccountTransferRow,
  BasicRow,
  CategoryTransferRow,
  FormRow,
  SplitAccountRow,
  SplitCategoryRow,
} from './Rows';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTable: React.FC<Props> = (props) => {
  const [isNewTxnFormVisible, setNewTxnFormVisible] =
    React.useState<boolean>(false);
  const [isSaving, setSaving] = React.useState<boolean>(false);
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

  function getAccountType(accountId: string): AccountType {
    const account = props.accountData.find((account) => account.id === accountId);
    if (account) {
      return account.accountType as AccountType;
    }
    throw new Error(`Unknown account id ${accountId}.`);
  }

  function handleAccountChange(accountId: string) {
    const accountType = getAccountType(accountId);
    if (accountType === ACCOUNT_TYPES.CREDIT_CARD) {
      form.setFieldValue('type', TRANSACTION_TYPES.CREDIT_CARD_CHARGE);
    } else {
      form.setFieldValue('type', TRANSACTION_TYPES.PAYMENT);
    }
  }

  function handleSplitAccount() {}

  function handleSplitCategory() {}

  function handleSubmit(values: NewTransactionFormValues) {
    setSaving(true);
    const { balance, isCredit, ...record } = values;
    if (record.accounts.length === 1 && record.categories.length === 1) {
      record.categories[0].amount = dollarsToCents(record.categories[0].amount);
      record.accounts[0].amount = record.categories[0].amount;
      record.accounts[0].isCredit = record.categories[0].isCredit;
    } else {
      throw new Error('Unimplemented');
    }

    requestPostTransaction(record).then(() => {
      form.reset();
      setSaving(false);
      setNewTxnFormVisible(false);
    });
  }

  async function requestPostTransaction(payload: ApiSchema.NewTransaction) {
    const responseData = await fetch('/api/transactions', {
      body: JSON.stringify({
        ...payload,
        // Mantine makes us store the date as a `Date` object. The API only
        //   deals with strings in YYYY-MM-DD (see project README for more
        //   detail), so we need to format the date in the payload.
        date: formatClientDate(payload.date),
      }),
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
      message: `Saved transaction "${responseData.description}"`,
      title: 'Success',
    });
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
    if (isNewTxnFormVisible) {
      return (
        <FormRow
          accountData={props.accountData}
          categoryData={props.categoryData}
          isSaving={isSaving}
          mantineForm={form}
          onAccountChange={handleAccountChange}
          onSplitAccount={handleSplitAccount}
          onSplitCategory={handleSplitCategory}
        />
      );
    }
    return (
      <tr>
        <td colSpan={8}>
          <Button
            variant="outline"
            compact
            onClick={() => setNewTxnFormVisible(true)}
          >
            Add New Transaction
          </Button>
        </td>
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
