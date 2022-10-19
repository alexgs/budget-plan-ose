/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
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
      transactionDate: new Date(),
      // transactionDate: dayjs().format('YYYY-MM-DD'),
      transactionType: 'payment',
    },
    onSubmit: (values) => {},
    validationSchema: Yup.object({
      transactionType: Yup.string().required()
    }),
  });

  function handleDateChange(date: Date) {
    console.log(date);
    formik.values.transactionDate = date;
  }

  const datePickerError: string|undefined = formik.touched.transactionDate && (formik.errors.transactionDate as string);

  return (
    <Page>
      <h1>Budget Plan</h1>
      <div>
        <form>
          <DatePicker
            allowFreeInput
            error={datePickerError}
            id="transactionDate"
            inputFormat="YYYY-MM-DD"
            label="Date"
            name="transactionDate"
            onBlur={formik.handleBlur}
            onChange={handleDateChange}
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
            value={formik.values.transactionType}
            required
          />
          <NativeSelect data={props.accounts} label="Account" required />
          <TextInput
            label="Description"
            placeholder="Payee or payer"
            required
          />
          <NativeSelect data={props.categories} label="Category" required />
          <NumberInput
            decimalSeparator="."
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            label="Amount"
            my="sm"
            precision={2}
            required
          />
          <Checkbox label="Credit or deposit" />
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
