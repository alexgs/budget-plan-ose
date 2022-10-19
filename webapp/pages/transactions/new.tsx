/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import * as Yup from 'yup';

import { getCategoryList } from '../../client-lib';
import { Page } from '../../components';
import { prisma } from '../../server-lib';

// TODO Handle splitting transaction

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NewTransaction: FC<Props> = (props) => {
  const formik = useFormik({
    initialValues: {
      account: '',
      amount: '',
      category: '',
      description: '',
      transactionDate: dayjs().format('YYYY-MM-DD'),
      transactionType: 'payment',
    },
    onSubmit: (values) => {},
    validationSchema: Yup.object({
      account: Yup.string().required(),
      // amount: Yup.number().required(),
      amount: Yup.string().required(),
      category: Yup.string().required(),
      description: Yup.string().required(),
      transactionDate: Yup.string().required(), // TODO Better validation for this field
      transactionType: Yup.string().required(),
    }),
  });

  return (
    <Page>
      <h1>Budget Plan</h1>
      <div>
        <form>
          <TextInput
            error={
              formik.touched.transactionDate && formik.errors.transactionDate
            }
            id="transactionDate"
            label="Date"
            name="transactionDate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Pick date"
            required
            value={formik.values.transactionDate}
          />
          <NativeSelect
            data={[
              { value: 'payment', label: 'Payment' },
              { value: 'credit_card_charge', label: 'Credit card charge' },
              { value: 'account_transfer', label: 'Account transfer' },
            ]}
            error={
              formik.touched.transactionType && formik.errors.transactionType
            }
            id="transactionType"
            label="Type"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="transactionType"
            required
            value={formik.values.transactionType}
          />
          <NativeSelect
            data={props.accounts}
            error={formik.touched.account && formik.errors.account}
            id="account"
            label="Account"
            name="account"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            value={formik.values.account}
          />
          <TextInput
            error={formik.touched.description && formik.errors.description}
            id="description"
            label="Description"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Payee or payer"
            required
            value={formik.values.description}
          />
          <NativeSelect
            data={props.categories}
            error={formik.touched.category && formik.errors.category}
            id="category"
            label="Category"
            name="category"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            value={formik.values.category}
          />
          <NumberInput
            decimalSeparator="."
            error={formik.touched.amount && formik.errors.amount}
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            id="amount"
            label="Amount"
            name="amount"
            my="sm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            precision={2}
            required
            value={parseFloat(formik.values.amount)}
          />
          <Checkbox
            label="Credit or deposit"
            required
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
