/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { useForm, yupResolver } from '@mantine/form';
import React from 'react';

import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../../client-lib/types';
import { EXTRA_ACCOUNT_OPTIONS, ExtraAccountOptions } from '../constants';
import { RowProps } from '../Rows/row-props';
import {
  ACCOUNT_TYPES,
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  AccountType,
  ApiSchema,
  TransactionType,
  dollarsToCents,
  schemaObjects,
} from '../../../shared-lib';
import { AccountTransferForm } from './AccountTransferForm';
import { CategoryTransferForm } from './CategoryTransferForm';

import { DefaultForm } from './DefaultForm';

interface Props extends Omit<RowProps, 'txn'> {
  data?: ApiSchema.UpdateTransaction;
  onCancel: VoidFunction;
  onSubmit: (
    values: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
  ) => void;
}

export const FormContainer: React.FC<Props> = (props) => {
  const form: NewTransactionFormHook = useForm({
    initialValues: {
      accounts: [
        {
          accountId:
            props.data?.accounts[0].accountId ?? props.accountData[0].id,
          amount: (props.data?.accounts[0].amount ?? 0) / 100,
          isCredit: props.data?.accounts[0].isCredit ?? (false as boolean),
          status: props.data?.accounts[0].status ?? AMOUNT_STATUS.PENDING,
        },
      ],
      balance: 0, // Client-only field
      categories: [
        {
          amount: (props.data?.categories[0].amount ?? 0) / 100,
          categoryId:
            props.data?.categories[0].categoryId ?? props.categoryData[0].id,
          isCredit: props.data?.categories[0].isCredit ?? (false as boolean),
        },
      ],
      date: props.data?.date ?? new Date(),
      description: props.data?.description ?? '',
      isCredit: false as boolean, // Client-only field
      type: getInitialTxnType(),
    },
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function getAccountType(
    accountId: string
  ): AccountType | ExtraAccountOptions {
    if (
      accountId === EXTRA_ACCOUNT_OPTIONS.ACCOUNT_TRANSFER ||
      accountId === EXTRA_ACCOUNT_OPTIONS.CATEGORY_TRANSFER
    ) {
      return accountId;
    }

    const account = props.accountData.find(
      (account) => account.id === accountId
    );
    if (account) {
      return account.accountType as AccountType;
    }

    throw new Error(`Unknown account id ${accountId}.`);
  }

  function getInitialTxnType(): TransactionType {
    if (props.data?.type) {
      return props.data.type;
    }

    const accountType = getAccountType(props.accountData[0].id);
    if (accountType === ACCOUNT_TYPES.CREDIT_CARD) {
      return TRANSACTION_TYPES.CREDIT_CARD_CHARGE;
    } else {
      return TRANSACTION_TYPES.PAYMENT;
    }
  }

  function handleAccountChange(accountId: string) {
    const accountType = getAccountType(accountId);
    if (accountType === EXTRA_ACCOUNT_OPTIONS.ACCOUNT_TRANSFER) {
      form.setFieldValue('type', TRANSACTION_TYPES.ACCOUNT_TRANSFER);
    } else if (accountType === EXTRA_ACCOUNT_OPTIONS.CATEGORY_TRANSFER) {
      form.setFieldValue('type', TRANSACTION_TYPES.CATEGORY_TRANSFER);
    } else if (accountType === ACCOUNT_TYPES.CREDIT_CARD) {
      form.setFieldValue('type', TRANSACTION_TYPES.CREDIT_CARD_CHARGE);
    } else {
      form.setFieldValue('type', TRANSACTION_TYPES.PAYMENT);
    }
  }

  function handleCancel() {
    props.onCancel();
  }

  function handleFormSubmit() {
    return form.onSubmit(handleSubmit, (values) => console.error(values));
  }

  function handleSplitCategory() {
    form.insertListItem('categories', {
      amount: 0,
      categoryId: props.categoryData[0].id,
      isCredit: false as boolean,
    });
  }

  function handleSubmit(values: NewTransactionFormValues) {
    const { balance, isCredit, ...record } = values;
    const isSimplePayment =
      record.accounts.length === 1 && record.categories.length === 1;
    const isSplitCategory =
      record.accounts.length === 1 && record.categories.length > 1;
    // TODO Handle account transfers that are really credit card payments or charges
    if (isSimplePayment) {
      record.categories[0].amount = dollarsToCents(record.categories[0].amount);
      record.accounts[0].amount = record.categories[0].amount;
      record.accounts[0].isCredit = record.categories[0].isCredit;
    } else if (isSplitCategory) {
      record.categories = record.categories.map((subrecord) => ({
        ...subrecord,
        amount: dollarsToCents(subrecord.amount),
      }));
      record.accounts[0].amount = dollarsToCents(balance);
      record.accounts[0].isCredit = isCredit;
    } else {
      throw new Error('Unimplemented');
    }

    if (props.data?.id) {
      props.onSubmit({
        ...record,
        id: props.data.id,
      });
    } else {
      props.onSubmit(record);
    }
  }

  if (form.values.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
    return (
      <AccountTransferForm
        accountData={props.accountData}
        categoryData={props.categoryData}
        formOnSubmit={handleFormSubmit}
        mantineForm={form}
        onAccountChange={handleAccountChange}
        onCancel={handleCancel}
      />
    );
  }

  if (form.values.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
    return (
      <CategoryTransferForm
        accountData={props.accountData}
        categoryData={props.categoryData}
        formOnSubmit={handleFormSubmit}
        mantineForm={form}
        onAccountChange={handleAccountChange}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <DefaultForm
      accountData={props.accountData}
      categoryData={props.categoryData}
      formOnSubmit={handleFormSubmit}
      mantineForm={form}
      onAccountChange={handleAccountChange}
      onCancel={handleCancel}
      onSplitCategory={handleSplitCategory}
      txnId={props.data?.id}
    />
  );
};
