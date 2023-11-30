/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { api, buildCategoryTree, getCategoryList } from '../../client-lib';
import { BorderlessRow } from './BorderlessRow';
import { InputCell } from './InputCell';
import { MultiRowForm } from './MultiRowForm';
import { SingleRowForm } from './SingleRowForm';

export const FORM_ID = 'transaction-form';

// This is somewhat confusing because (for array values) index 0 will be the
// top-level form row, while the actual category subrecords start at index 1.
export interface FormValues {
  account: string;
  categories: string[];
  date: Date;
  description: string;
  notes: string[];
  credit: number[];
  debit: number[];
}

interface Props {
  columnCount: number;
  onCancel: VoidFunction;
}

export const TransactionForm: React.FC<Props> = (props) => {
  // TODO Handle errors
  const { error: accountError, accounts } = api.useAllAccounts();
  const { error: categoryError, categories } = api.useAllCategories();

  let accountsList: { value: string; label: string }[] = [];
  if (accounts) {
    accountsList = accounts
      .map((account) => ({
        value: account.id,
        label: account.description,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  let categoriesList: { value: string; label: string }[] = [];
  if (categories) {
    categoriesList = getCategoryList(buildCategoryTree(categories))
      .filter((cat) => cat.isLeaf)
      .map((cat) => ({
        value: cat.id,
        label: cat.label,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  const form = useForm<FormValues>({
    initialValues: {
      account: accountsList[0].value,
      categories: [categoriesList[0].value],
      date: new Date(), // TODO Scrub the timezone from the date before sending it to the backend
      description: '',
      notes: [''],
      credit: [0],
      debit: [0],
    },
    // TODO Add validation for the form data
  });

  function calcCreditRemaining() {
    return (
      form.values.credit[0] -
      form.values.credit.slice(1).reduce((sum, value) => sum + value, 0)
    );
  }

  function calcDebitRemaining() {
    return (
      form.values.debit[0] -
      form.values.debit.slice(1).reduce((sum, value) => sum + value, 0)
    );
  }

  function enableSaveButton() {
    return calcCreditRemaining() === 0 && calcDebitRemaining() === 0;
  }

  function handleCancelClick() {
    // TODO Reset form state
    props.onCancel();
  }

  function handleCategoryMinusClick(index: number) {
    form.removeListItem('categories', index);
    form.removeListItem('notes', index);
    form.removeListItem('credit', index);
    form.removeListItem('debit', index);
  }

  function handleCategoryPlusClick() {
    form.insertListItem('categories', categoriesList[0].value);
    form.insertListItem('notes', '');
    form.insertListItem('credit', 0);
    form.insertListItem('debit', 0);
  }

  // TODO Handle saving a new transaction

  function renderCategoryPlusButton() {
    if (form.values.categories.length === 1) {
      return (
        <Button
          fullWidth
          leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
          onClick={handleCategoryPlusClick}
          size="xs"
          variant="subtle"
        >
          Split
        </Button>
      );
    }
    return null;
  }

  function renderFormRows() {
    if (form.values.categories.length === 1) {
      return (
        <SingleRowForm
          accountsList={accountsList}
          categoriesList={categoriesList}
          form={form}
        />
      );
    }
    return (
      <MultiRowForm
        accountsList={accountsList}
        categoriesList={categoriesList}
        creditRemaining={calcCreditRemaining()}
        debitRemaining={calcDebitRemaining()}
        form={form}
        onCategoryMinusClick={handleCategoryMinusClick}
        onCategoryPlusClick={handleCategoryPlusClick}
      />
    );
  }

  return (
    <>
      {renderFormRows()}
      <BorderlessRow>
        <td colSpan={4} />
        <InputCell>
          {renderCategoryPlusButton()}
        </InputCell>
        <td colSpan={3}>
          <Group position="right">
            <Button onClick={handleCancelClick} size="xs" variant="subtle">
              Cancel
            </Button>
            <Button disabled={!enableSaveButton()} size="xs">Save</Button>
          </Group>
        </td>
      </BorderlessRow>
    </>
  );
};
