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
  function getInitialAccountSubrecords(): ApiSchema.UpdateTransaction['accounts'] {
    if (!props.data?.accounts) {
      return [
        {
          accountId: props.accountData[0].id,
          amount: 0,
          isCredit: false as boolean,
          status: AMOUNT_STATUS.PENDING,
        },
      ];
    }

    return props.data.accounts.map((subrecord) => ({
      ...subrecord,
      amount: subrecord.amount / 100,
    }));
  }

  function getInitialCategorySubrecords(): ApiSchema.UpdateTransaction['categories'] {
    if (!props.data?.categories) {
      return [
        {
          amount: 0,
          categoryId: props.categoryData[0].id,
          isCredit: false as boolean,
        },
      ];
    }

    return props.data.categories.map((subrecord) => ({
      ...subrecord,
      amount: subrecord.amount / 100,
    }));
  }

  const form: NewTransactionFormHook = useForm({
    initialValues: {
      accounts: getInitialAccountSubrecords(),
      balance: 0, // Client-only field
      categories: getInitialCategorySubrecords(),
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
      form.setFieldValue('description', 'Account transfer');
      form.setFieldValue('accounts.0.accountId', props.accountData[0].id);
      form.insertListItem('accounts', {
        amount: 0,
        accountId: props.accountData[0].id,
        isCredit: true as boolean,
        status: AMOUNT_STATUS.PENDING,
      });
    } else if (accountType === EXTRA_ACCOUNT_OPTIONS.CATEGORY_TRANSFER) {
      form.setFieldValue('type', TRANSACTION_TYPES.CATEGORY_TRANSFER);
      form.setFieldValue('description', 'Category transfer');
      form.insertListItem('categories', {
        amount: 0,
        categoryId: props.categoryData[0].id,
        isCredit: false as boolean,
      });
    } else if (accountType === ACCOUNT_TYPES.CREDIT_CARD) {
      form.setFieldValue('type', TRANSACTION_TYPES.CREDIT_CARD_CHARGE);
    } else {
      form.setFieldValue('type', TRANSACTION_TYPES.PAYMENT);
    }
  }

  function handleCancel() {
    props.onCancel();
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
    const isCreditCardPayment =
      record.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER &&
      getAccountType(record.accounts[1].accountId) ===
        ACCOUNT_TYPES.CREDIT_CARD;
    const isCreditCardCharge =
      record.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER &&
      getAccountType(record.accounts[0].accountId) ===
        ACCOUNT_TYPES.CREDIT_CARD;

    if (isCreditCardCharge && isCreditCardPayment) {
      throw new Error('Balance transfers are unsupported at this time.');
    }

    if (record.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
      if (record.categories.length < 2) {
        throw new Error(
          `Incorrect number of category subrecords (expected at least 2, found ${record.categories.length}).`
        );
      }
      record.accounts = [];
      record.categories = record.categories.map((subrecord) => ({
        ...subrecord,
        amount: dollarsToCents(subrecord.amount),
      }));
    } else if (isSimplePayment) {
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
    } else if (isCreditCardPayment) {
      if (record.accounts.length !== 2) {
        throw new Error(
          `Incorrect number of account subrecords (expected 2, found ${record.accounts.length}).`
        );
      }
      record.type = TRANSACTION_TYPES.CREDIT_CARD_PAYMENT;
      record.description = 'Credit card payment';
      // We don't need to set the category here; we just need to send the account subrecords to the server, and it will take care of the business logic
      record.categories = [];
      record.accounts[0].amount = dollarsToCents(record.accounts[0].amount);
      record.accounts[1].amount = record.accounts[0].amount;
    } else if (isCreditCardCharge) {
      throw new Error('Unimplemented');

      // TODO I don't think the below approach is correct, but I haven't really
      //   thought this through. Account transfers from a credit card are an
      //   edge case.

      // if (record.accounts.length !== 2) {
      //   throw new Error(
      //     `Incorrect number of account subrecords (expected 2, found ${record.accounts.length}).`
      //   );
      // }
      // record.type = TRANSACTION_TYPES.CREDIT_CARD_CHARGE;
      // record.description = 'Credit card charge';
      // record.accounts[0].amount = dollarsToCents(record.accounts[0].amount);
      // record.accounts[1].amount = record.accounts[0].amount;
      // record.categories = [{
      //   categoryId: SYSTEM_IDS.CATEGORIES.ACCOUNT_TRANSFER,
      //   isCredit: false,
      //   amount: record.accounts[0].amount,
      // }];
    } else if (record.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
      if (record.accounts.length !== 2) {
        throw new Error(
          `Incorrect number of account subrecords (expected 2, found ${record.accounts.length}).`
        );
      }
      record.categories = [];
      record.accounts[0].amount = dollarsToCents(record.accounts[0].amount);
      record.accounts[1].amount = record.accounts[0].amount;
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
        mantineForm={form}
        onAccountChange={handleAccountChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }

  if (form.values.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
    return (
      <CategoryTransferForm
        accountData={props.accountData}
        categoryData={props.categoryData}
        mantineForm={form}
        onAccountChange={handleAccountChange}
        onCancel={handleCancel}
        onSplitCategory={handleSplitCategory}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <DefaultForm
      accountData={props.accountData}
      categoryData={props.categoryData}
      mantineForm={form}
      onAccountChange={handleAccountChange}
      onCancel={handleCancel}
      onSplitCategory={handleSplitCategory}
      onSubmit={handleSubmit}
      txnId={props.data?.id}
    />
  );
};
