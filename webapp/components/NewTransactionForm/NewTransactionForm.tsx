/*
 * Copyright 2022-23 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FinancialAccount } from '@prisma/client';
import React from 'react';

import { formatClientDate } from '../../client-lib';
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
  getFriendlyTransactionType,
  schemaObjects,
} from '../../shared-lib';

import { AccountTransfer } from './AccountTransfer';
import { CategoryTransfer } from './CategoryTransfer';
import { DateField, TransactionTypeField } from './Fields';
import { SinglePayment } from './SinglePayment';
import { SplitPayment } from './SplitPayment';

interface Props {
  accounts: FinancialAccount[];
  categories: CategoryValues[];
}

export const NewTransactionForm: React.FC<Props> = (props) => {
  const accounts = props.accounts.map((account) => ({
    value: account.id,
    label: account.description,
  }));

  const form: NewTransactionFormHook = useForm({
    initialValues: {
      amounts: [
        {
          accountId: accounts[0].value,
          amount: 0,
          categoryId: props.categories[0].id,
          isCredit: false as boolean,
          status: AMOUNT_STATUS.PENDING,
        },
      ],
      balance: 0, // Client-only field
      date: new Date(),
      description: '',
      isCredit: false as boolean, // Client-only field
      type: TRANSACTION_TYPES.PAYMENT as TransactionType,
    },
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function ensureAtLeastTwoAmounts() {
    if (form.values.amounts.length < 2) {
      const countToAdd = 2 - form.values.amounts.length;
      for (let i = 0; i < countToAdd; i++) {
        form.insertListItem('amounts', {
          accountId: accounts[0].value,
          amount: 0,
          categoryId: props.categories[0].id,
          isCredit: false,
          notes: '',
          status: AMOUNT_STATUS.PENDING,
        });
      }
    }
  }

  function ensureExactlyTwoAmounts() {
    ensureAtLeastTwoAmounts();
    if (form.values.amounts.length > 2) {
      const countToRemove = form.values.amounts.length - 2;
      for (let i = 0; i < countToRemove; i++) {
        form.removeListItem('amounts', 2);
      }
    }
  }

  // TODO function handleAccountChange() should change transaction type (and transaction type options) based on account type

  function handleSplitClick() {
    form.insertListItem('amounts', {
      accountId: accounts[0].value,
      amount: 0,
      categoryId: props.categories[0].id,
      isCredit: false,
      notes: '',
      status: AMOUNT_STATUS.PENDING,
    });
  }

  function handleSubmit(values: NewTransactionFormValues) {
    // TODO Display a loading modal
    const { balance, isCredit, ...record } = values;
    const amounts = record.amounts.map((amount) => ({
      ...amount,
      amount: amount.amount * 100,
    }));
    const payload = {
      ...record,
      amounts,
    };
    void requestPostTransaction(payload);
  }

  function handleTransactionTypeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    if (event.currentTarget.value === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
      ensureExactlyTwoAmounts();
      form.setValues({
        balance: 0,
        description: getFriendlyTransactionType(
          TRANSACTION_TYPES.ACCOUNT_TRANSFER
        ),
      });
    }
    if (event.currentTarget.value === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
      ensureAtLeastTwoAmounts();
      form.setValues({
        balance: 0,
        description: getFriendlyTransactionType(
          TRANSACTION_TYPES.CATEGORY_TRANSFER
        ),
      });
    }
  }

  async function requestPostTransaction(payload: ApiSchema.NewTransaction) {
    const responseData = await fetch('/api/transactions', {
      body: JSON.stringify({
        ...payload,
        // Mantine makes us store the date as a `Date` object, but really the
        //   API only deals with strings in YYYY-MM-DD (see project README for
        //   more detail).
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

  const categoriesData = props.categories
    .filter((cat) => cat.isLeaf)
    .map((cat) => ({
      value: cat.id,
      label: cat.label,
    }));

  function renderFormBody() {
    if (form.values.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
      return <AccountTransfer accounts={accounts} mantineForm={form} />;
    }

    if (form.values.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
      return (
        <CategoryTransfer
          categories={categoriesData}
          mantineForm={form}
          onSplitClick={handleSplitClick}
        />
      );
    }

    // Transaction type is either "payment" or "credit card charge"
    if (form.values.amounts.length === 1) {
      return (
        <SinglePayment
          accounts={accounts}
          categories={categoriesData}
          mantineForm={form}
          onSplitClick={handleSplitClick}
        />
      );
    }

    return (
      <SplitPayment
        accounts={accounts}
        categories={categoriesData}
        mantineForm={form}
        onSplitClick={handleSplitClick}
      />
    );
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.error(values))}
    >
      <DateField mantineForm={form} />
      <TransactionTypeField
        mantineForm={form}
        onChange={handleTransactionTypeChange}
      />
      {renderFormBody()}
    </form>
  );
};
