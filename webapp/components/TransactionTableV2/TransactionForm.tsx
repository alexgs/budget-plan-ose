/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';
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
  accountsList: { value: string; label: string }[];
  categoriesList: { value: string; label: string }[];
  columnCount: number;
  form: UseFormReturnType<FormValues>;
  onCancel: VoidFunction;
}

export const TransactionForm: React.FC<Props> = (props) => {
  function calcCreditRemaining() {
    return (
      props.form.values.credit[0] -
      props.form.values.credit.slice(1).reduce((sum, value) => sum + value, 0)
    );
  }

  function calcDebitRemaining() {
    return (
      props.form.values.debit[0] -
      props.form.values.debit.slice(1).reduce((sum, value) => sum + value, 0)
    );
  }

  function enableSaveButton() {
    if (props.form.values.categories.length > 1) {
      return calcCreditRemaining() === 0 && calcDebitRemaining() === 0;
    }
    return true;
  }

  function handleCancelClick() {
    // TODO Reset form state
    props.onCancel();
  }

  function handleCategoryMinusClick(index: number) {
    if (props.form.values.categories.length === 3) {
      // Remove two rows if it's the last split
      props.form.removeListItem('categories', 2);
      props.form.removeListItem('notes', 2);
      props.form.removeListItem('credit', 2);
      props.form.removeListItem('debit', 2);
      props.form.removeListItem('categories', 1);
      props.form.removeListItem('notes', 1);
      props.form.removeListItem('credit', 1);
      props.form.removeListItem('debit', 1);
    } else {
      props.form.removeListItem('categories', index);
      props.form.removeListItem('notes', index);
      props.form.removeListItem('credit', index);
      props.form.removeListItem('debit', index);
    }
  }

  function handleCategoryPlusClick() {
    if (props.form.values.categories.length === 1) {
      // Insert two rows if it's the first split
      props.form.insertListItem('categories', props.categoriesList[0].value);
      props.form.insertListItem('notes', '');
      props.form.insertListItem('credit', 0);
      props.form.insertListItem('debit', 0);
      props.form.insertListItem('categories', props.categoriesList[0].value);
      props.form.insertListItem('notes', '');
      props.form.insertListItem('credit', 0);
      props.form.insertListItem('debit', 0);
    } else {
      props.form.insertListItem('categories', props.categoriesList[0].value);
      props.form.insertListItem('notes', '');
      props.form.insertListItem('credit', 0);
      props.form.insertListItem('debit', 0);
    }
  }

  function renderCategoryPlusButton() {
    if (props.form.values.categories.length === 1) {
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
    if (props.form.values.categories.length === 1) {
      return (
        <SingleRowForm
          accountsList={props.accountsList}
          categoriesList={props.categoriesList}
          form={props.form}
        />
      );
    }
    return (
      <MultiRowForm
        accountsList={props.accountsList}
        categoriesList={props.categoriesList}
        creditRemaining={calcCreditRemaining()}
        debitRemaining={calcDebitRemaining()}
        form={props.form}
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
        <InputCell>{renderCategoryPlusButton()}</InputCell>
        <td colSpan={3}>
          <Group position="right">
            <Button onClick={handleCancelClick} size="xs" variant="subtle">
              Cancel
            </Button>
            <Button
              disabled={!enableSaveButton()}
              form={FORM_ID}
              size="xs"
              type="submit"
            >
              Save
            </Button>
          </Group>
        </td>
      </BorderlessRow>
    </>
  );
};
