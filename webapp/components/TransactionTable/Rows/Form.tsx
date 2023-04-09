/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faCancel,
  faFloppyDisk,
  faSplit,
} from '@fortawesome/pro-regular-svg-icons';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  CSSObject,
  MantineTheme,
  NativeSelect,
  NumberInput,
  Select,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';

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
import { Row } from '../Components/Row';
import { buildCategoryTree, getCategoryList } from '../../../client-lib';
import { NewTransactionFormHook } from '../../../client-lib/types';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  ApiSchema,
  TransactionType,
  dollarsToCents,
  schemaObjects,
} from '../../../shared-lib';
import { contentWidth } from '../../tokens';

import { RowProps } from './row-props';

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

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
  const viewport = useViewportSize();

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

  function renderCategoryField() {
    const categories = getCategoryList(buildCategoryTree(props.categoryData))
      .filter((cat) => cat.isLeaf)
      .map((cat) => ({
        value: cat.id,
        label: cat.label,
      }));
    if (viewport.width > contentWidth.medium) {
      return (
        <Select
          data={categories}
          required
          searchable
          {...form.getInputProps(`categories.0.categoryId`)}
        />
      );
    }

    return (
      <NativeSelect
        data={categories}
        required
        {...form.getInputProps(`categories.0.categoryId`)}
      />
    );
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
        <CategoryCell>{renderCategoryField()}</CategoryCell>
        <NotesCell></NotesCell>
        <AmountCell style={{ display: 'flex', alignItems: 'center' }}>
          <NumberInput
            decimalSeparator="."
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            precision={2}
            required
            sx={form.values.categories[0].isCredit ? amountStyle : {}}
            {...form.getInputProps(`categories.0.amount`)}
          />
          <Checkbox
            label="Credit"
            {...form.getInputProps('categories.0.isCredit', {
              type: 'checkbox',
            })}
          />
        </AmountCell>
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
