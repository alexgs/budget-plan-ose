/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { formatClientDate, getCategoryList } from '../../client-lib';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';
import { Page } from '../../components';
import {
  SinglePaymentForm,
  SplitPaymentForm,
} from '../../components/NewTransactionForm';
import { prisma } from '../../server-lib';
import { newTransactionSchema } from '../../shared-lib';

interface Props {
  accounts: { label: string; value: string }[];
  categories: { label: string; value: string }[];
}

const NewTransaction: FC<Props> = (props) => {
  const form: NewTransactionFormHook = useForm({
    initialValues: {
      amounts: [
        {
          accountId: props.accounts[0].value,
          amount: 0,
          categoryId: props.categories[0].value,
          isCredit: false as boolean,
          status: 'pending',
        },
      ],
      balance: 0, // Client-only field
      date: new Date(),
      description: '',
      isCredit: false as boolean, // Client-only field
      type: 'payment',
    },
    validate: yupResolver(newTransactionSchema),
    validateInputOnChange: true,
  });

  function handleSplitClick() {
    form.insertListItem('amounts', {
      account: props.accounts[0].value,
      amount: 0,
      category: props.categories[0].value,
      isCredit: false,
      notes: '',
    });
  }

  function handleSubmit(values: NewTransactionFormValues) {
    // TODO Display a loading modal
    void requestPostTransaction(values);
  }

  async function requestPostTransaction(values: NewTransactionFormValues) {
    const { balance, isCredit, ...record } = values;
    const amounts = record.amounts.map((amount) => ({
      ...amount,
      amount: amount.amount * 100,
    }));
    const payload = {
      ...record,
      amounts,
      date: formatClientDate(record.date),
    }

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

  function renderForm() {
    if (form.values.amounts.length === 1) {
      return (
        <SinglePaymentForm
          accounts={props.accounts}
          categories={props.categories}
          mantineForm={form}
          onSplitClick={handleSplitClick}
          onSubmit={handleSubmit}
        />
      );
    } else {
      return (
        <SplitPaymentForm
          accounts={props.accounts}
          categories={props.categories}
          mantineForm={form}
          onSplitClick={handleSplitClick}
          onSubmit={handleSubmit}
        />
      );
    }
  }

  return (
    <Page>
      <h1>Budget Plan</h1>
      <div>{renderForm()}</div>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO Use API instead of server-side props
  const accountsTemp = await prisma.financialAccount.findMany();
  const accounts = accountsTemp.map((account) => ({
    value: account.id,
    label: account.description,
  }));

  const categoriesTemp = await prisma.category.findMany();
  const categories = getCategoryList(categoriesTemp).map((cat) => ({
    value: cat.id,
    label: cat.label,
  }));

  return { props: { accounts, categories } };
};

export default NewTransaction;
