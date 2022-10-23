/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { useForm, yupResolver } from '@mantine/form';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { getCategoryList } from '../../client-lib';
import { NewTransactionFormHook } from '../../client-lib/types';
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

  function renderForm() {
    if (form.values.amounts.length === 1) {
      return (
        <SinglePaymentForm
          accounts={props.accounts}
          categories={props.categories}
          mantineForm={form}
          onSplitClick={handleSplitClick}
        />
      );
    } else {
      return (
        <SplitPaymentForm
          accounts={props.accounts}
          categories={props.categories}
          mantineForm={form}
          onSplitClick={handleSplitClick}
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
