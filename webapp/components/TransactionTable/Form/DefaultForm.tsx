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
import React from 'react';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../../client-lib/types';
import { Account, Category } from '../../../shared-lib';
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

interface Props {
  accountData: Account[];
  categoryData: Category[];
  mantineForm: NewTransactionFormHook;
  onAccountChange: (accountId: string) => void;
  onCancel: VoidFunction;
  onSplitCategory: VoidFunction;
  onSubmit: (values: NewTransactionFormValues) => void;
  txnId?: string;
}

export const DefaultForm: React.FC<Props> = (props) => {
  function renderSubrecordRows() {
    if (props.mantineForm.values.categories.length === 1) {
      return null;
    }

    return props.mantineForm.values.categories.map((subrecord, index) => {
      return (
        <Row border={false} key={`cat-subrecord-${index}}`}>
          <ChevronCell>{/* Checkbox */}</ChevronCell>
          <DateCell></DateCell>
          <AccountCell></AccountCell>
          <DescriptionCell></DescriptionCell>
          <CategoryCell>
            <CategoryField
              categoryData={props.categoryData}
              {...props.mantineForm.getInputProps(
                `categories.${index}.categoryId`
              )}
            />
          </CategoryCell>
          <NotesCell>{/* Notes */}</NotesCell>
          <AmountInputCell
            checkboxInputProps={props.mantineForm.getInputProps(
              `categories.${index}.isCredit`,
              { type: 'checkbox' }
            )}
            isCredit={props.mantineForm.values.categories[index].isCredit}
            numberInputProps={props.mantineForm.getInputProps(
              `categories.${index}.amount`
            )}
          />
          <ButtonsCell></ButtonsCell>
        </Row>
      );
    });
  }

  const key = props.txnId ?? 'new-txn';
  return (
    <form
      onSubmit={props.mantineForm.onSubmit(props.onSubmit, (values) =>
        console.error(values)
      )}
    >
      <Row key={key}>
        <ChevronCell>{/* Checkbox */}</ChevronCell>
        <DateCell>
          <DatePicker
            allowFreeInput
            inputFormat="YYYY-MM-DD"
            required
            {...props.mantineForm.getInputProps('date')}
          />
        </DateCell>
        <AccountCell>
          <AccountField
            mantineForm={props.mantineForm}
            accountData={props.accountData}
            onAccountChange={props.onAccountChange}
          />
        </AccountCell>
        <DescriptionCell>
          <TextInput
            placeholder="Payee"
            required
            {...props.mantineForm.getInputProps('description')}
          />
        </DescriptionCell>
        <MainCategoryCell
          categoryData={props.categoryData}
          mantineForm={props.mantineForm}
        />
        <NotesCell></NotesCell>
        <MainAmountCell mantineForm={props.mantineForm} />
        <ButtonsCell>
          <UnstyledButton sx={{ marginLeft: '1rem' }} type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </UnstyledButton>
          <UnstyledButton
            onClick={props.onCancel}
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
          <Button compact onClick={props.onSplitCategory} variant="subtle">
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
