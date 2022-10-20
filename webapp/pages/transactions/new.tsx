/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
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
import * as Yup from 'yup';

import { getCategoryList } from '../../client-lib';
import { Page } from '../../components';
import { prisma } from '../../server-lib';

// TODO Handle splitting transaction

const formSchema = Yup.object({
  account: Yup.string().required(),
  amount: Yup.number().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  transactionDate: Yup.date().required(), // TODO Better error message for this field
  transactionType: Yup.string().required(),
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NewTransaction: FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      account: props.accounts[0].value,
      amount: 0,
      category: props.categories[0].value,
      description: '',
      isCredit: false,
      transactionDate: new Date(),
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
          <DatePicker
            allowFreeInput
            inputFormat="YYYY-MM-DD"
            label="Date"
            my="sm"
            required
            {
              // I really dislike this syntax; it's too much magic
              ...form.getInputProps('transactionDate')
            }
          />
          <NativeSelect
            data={[
              { value: 'payment', label: 'Payment' },
              { value: 'credit_card_charge', label: 'Credit card charge' },
              { value: 'account_transfer', label: 'Account transfer' },
            ]}
            label="Type"
            my="sm"
            required
            {...form.getInputProps('transactionType')}
          />
          <NativeSelect
            data={props.accounts}
            label="Account"
            my="sm"
            required
            {...form.getInputProps('account')}
          />
          <TextInput
            label="Description"
            placeholder="Payee or payer"
            my="sm"
            required
            {...form.getInputProps('description')}
          />
          <NativeSelect
            data={props.categories}
            label="Category"
            my="sm"
            required
            {...form.getInputProps('category')}
          />
          <NumberInput
            decimalSeparator="."
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            label="Amount"
            my="sm"
            precision={2}
            required
            {...form.getInputProps('amount')}
          />
          <Checkbox
            label="Credit or deposit"
            {...form.getInputProps('isCredit', { type: 'checkbox' })}
          />
          <Group position="right" mt="md">
            <Button type="submit">Save</Button>
          </Group>
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
