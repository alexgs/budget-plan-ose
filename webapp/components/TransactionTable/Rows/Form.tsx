/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faCancel,
  faFloppyDisk,
  faSplit,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  NativeSelect,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import React from 'react';

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
import { NewTransactionFormHook } from '../../../client-lib/types';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
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

  function handleSubmit(values: ApiSchema.NewTransaction) {
    const accounts = values.accounts.map((account) => ({
      ...account,
      amount: dollarsToCents(account.amount),
    }));
    const categories = values.categories.map((category) => ({
      ...category,
      amount: dollarsToCents(category.amount),
    }));
    const payload = {
      ...values,
      accounts,
      categories,
    };

    if (props.data?.id) {
      props.onSubmit({
        ...payload,
        id: props.data.id,
      });
    } else {
      props.onSubmit(payload);
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

  const accounts = props.accountData.map((account) => ({
    value: account.id,
    label: account.description,
  }));
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
          <NativeSelect
            data={accounts}
            required
            {...form.getInputProps('accounts.0.accountId')}
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
