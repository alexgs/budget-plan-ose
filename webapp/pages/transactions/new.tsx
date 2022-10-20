/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { faSplit } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Group,
  NativeSelect,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';

import { getCategoryList } from '../../client-lib';
import { Page } from '../../components';
import { SinglePaymentForm, SplitPaymentForm } from '../../components/NewTransactionForm';
import { prisma } from '../../server-lib';

const formSchema = yup.object({
  amounts: yup.array().of(
    yup.object({
      account: yup.string().required(),
      amount: yup.number().required(),
      category: yup.string().required(),
      id: yup.string().required(),
      isCredit: yup.boolean().required(),
      notes: yup.number().required(),
    })
  ),
  description: yup.string().required(),
  id: yup.string().required(),
  transactionDate: yup.date().required(), // TODO Better error message for this field
  transactionType: yup.string().required(),
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NewTransaction: FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      amounts: [
        {
          account: props.accounts[0].value,
          amount: 0,
          category: props.categories[0].value,
          id: uuid(),
          isCredit: false,
          notes: '',
        },
      ],
      description: '',
      id: uuid(),
      transactionDate: new Date(),
      transactionType: 'payment',
    },
    validate: yupResolver(formSchema),
    validateInputOnChange: true,
  });

  function handleSplitClick() {
    form.insertListItem('amounts', {
      account: props.accounts[0].value,
      amount: 0,
      category: props.categories[0].value,
      id: uuid(),
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
