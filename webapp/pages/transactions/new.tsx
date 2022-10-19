/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import dayjs from 'dayjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import * as Yup from 'yup';

import { getCategoryList } from '../../client-lib';
import { Page } from '../../components';
import { prisma } from '../../server-lib';

// TODO Handle splitting transaction

const formSchema = Yup.object({
  account: Yup.string().required(),
  // amount: Yup.number().required(),
  amount: Yup.string().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  transactionDate: Yup.string().required(), // TODO Better validation for this field
  transactionType: Yup.string().required(),
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NewTransaction: FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      account: '',
      amount: '',
      category: '',
      description: '',
      transactionDate: dayjs().format('YYYY-MM-DD'),
      transactionType: 'payment',
    },
    validate: yupResolver(formSchema),
    validateInputOnChange: true,
  });

  return (
    <Page>
      <h1>Budget Plan</h1>
      <div>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Description"
            placeholder="Payee or payer"
            required
            {
              // I really dislike this syntax; it's too much magic
              ...form.getInputProps('description')
            }
          />
        </form>
      </div>
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
