/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faCancel,
  faFloppyDisk,
  faSplit,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextInput, UnstyledButton } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import React from 'react';

import { AccountField } from '../Components/AccountField';
import { AmountInputCell } from '../Components/AmountInputCell';
import { CategoryField } from '../Components/CategoryField';
import {
  AccountCell,
  AmountCell,
  ButtonsCell,
  CategoryCell,
  ChevronCell,
  DateCell,
  DescriptionCell,
  NotesCell,
} from '../Components/Cell';
import { MainAmountCell } from '../Components/MainAmountCell';
import { MainCategoryCell } from '../Components/MainCategoryCell';
import { Row } from '../Components/Row';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../../client-lib/types';
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

import { RowProps } from './row-props';

interface Props extends Omit<RowProps, 'txn'> {
  data?: ApiSchema.UpdateTransaction;
  onCancel: VoidFunction;
  onSubmit: (
    values: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
  ) => void;
}

export const Form: React.FC<Props> = (props) => {
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
      type: props.data?.type ?? (TRANSACTION_TYPES.PAYMENT as TransactionType),
    },
    validate: yupResolver(schemaObjects.newTransaction),
    validateInputOnChange: true,
  });

  function getAccountType(accountId: string): AccountType {
    const account = props.accountData.find(
      (account) => account.id === accountId
    );
    if (account) {
      return account.accountType as AccountType;
    }
    throw new Error(`Unknown account id ${accountId}.`);
  }

  function handleAccountChange(accountId: string) {
    const accountType = getAccountType(accountId);
    if (accountType === ACCOUNT_TYPES.CREDIT_CARD) {
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

  function renderSubrecordRows() {
    if (form.values.categories.length === 1) {
      return null;
    }

    return form.values.categories.map((subrecord, index) => {
      return (
        <Row border={false}>
          <ChevronCell>{/* Checkbox */}</ChevronCell>
          <DateCell></DateCell>
          <AccountCell></AccountCell>
          <DescriptionCell></DescriptionCell>
          <CategoryCell>
            <CategoryField
              categoryData={props.categoryData}
              {...form.getInputProps(`categories.${index}.categoryId`)}
            />
          </CategoryCell>
          <NotesCell>{/* Notes */}</NotesCell>
          <AmountInputCell
            checkboxInputProps={form.getInputProps(
              `categories.${index}.isCredit`,
              { type: 'checkbox' }
            )}
            isCredit={form.values.categories[index].isCredit}
            numberInputProps={form.getInputProps(`categories.${index}.amount`)}
          />
          <ButtonsCell></ButtonsCell>
        </Row>
      );
    });
  }

  const key = props.data ? props.data.id : 'new-txn';
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.error(values))}
    >
      <Row key={key}>
        <ChevronCell>{/* Checkbox */}</ChevronCell>
        <DateCell>
          <DatePicker
            allowFreeInput
            inputFormat="YYYY-MM-DD"
            required
            {...form.getInputProps('date')}
          />
        </DateCell>
        <AccountCell>
          <AccountField
            mantineForm={form}
            accountData={props.accountData}
            onAccountChange={handleAccountChange}
          />
        </AccountCell>
        <DescriptionCell>
          <TextInput
            placeholder="Payee"
            required
            {...form.getInputProps('description')}
          />
        </DescriptionCell>
        <MainCategoryCell
          categoryData={props.categoryData}
          mantineForm={form}
        />
        <NotesCell></NotesCell>
        <MainAmountCell mantineForm={form} />
        <ButtonsCell>
          <UnstyledButton sx={{ marginLeft: '1rem' }} type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </UnstyledButton>
          <UnstyledButton
            onClick={handleCancel}
            sx={{ marginLeft: '1rem' }}
            type="button"
          >
            <FontAwesomeIcon icon={faCancel} />
          </UnstyledButton>
        </ButtonsCell>
      </Row>
      {renderSubrecordRows()}
      <Row key={`${key}-controls`} border={false}>
        <ChevronCell>{/* Checkbox */}</ChevronCell>
        <DateCell></DateCell>
        <AccountCell></AccountCell>
        <DescriptionCell></DescriptionCell>
        <CategoryCell>
          <Button compact onClick={handleSplitCategory} variant="subtle">
            <FontAwesomeIcon icon={faSplit} />
            &nbsp; Split
          </Button>
        </CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <AmountCell>
          {/* TODO Render a "credit" check box for every subrecord _and_ on the main row*/}
        </AmountCell>
        <ButtonsCell></ButtonsCell>
      </Row>
    </form>
  );
};
