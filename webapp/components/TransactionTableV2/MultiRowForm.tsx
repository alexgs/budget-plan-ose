/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { NativeSelect, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { BorderlessRow } from './BorderlessRow';
import { InputCell } from './InputCell';
import { FORM_ID, FormValues } from './TransactionForm';

interface Props {
  accountsList: { value: string; label: string }[];
  categoriesList: { value: string; label: string }[];
  form: UseFormReturnType<FormValues>;
}

export const MultiRowForm: React.FC<Props> = (props) => {
  const { accountsList, categoriesList, form } = props;

  function renderSubrecordRows() {
    const output = [];
    for (let i = 1; i < form.values.categories.length; i++) {
      output.push(
        <BorderlessRow>
          <td />
          <td />
          <td />
          <td />
          <InputCell>
            <Select
              required
              searchable
              switchDirectionOnFlip
              data={categoriesList}
              form={FORM_ID}
              size="xs"
              {...form.getInputProps(`categories.${i}`)}
            />
          </InputCell>
          <InputCell>
            <TextInput
              required
              form={FORM_ID}
              placeholder="Notes"
              size="xs"
              {...form.getInputProps(`notes.${i}`)}
            />
          </InputCell>
          <InputCell>
            <NumberInput
              hideControls
              required
              decimalSeparator="."
              form={FORM_ID}
              precision={2}
              size="xs"
              {...form.getInputProps(`credit.${i}`)}
            />
          </InputCell>
          <InputCell>
            <NumberInput
              hideControls
              required
              decimalSeparator="."
              form={FORM_ID}
              precision={2}
              size="xs"
              {...form.getInputProps(`debit.${i}`)}
            />
          </InputCell>
        </BorderlessRow>
      );
    }
    return output;
  }

  return (
    <>
      <tr>
        <td />
        <InputCell>
          <DatePicker
            allowFreeInput
            required
            form={FORM_ID}
            inputFormat="YYYY-MM-DD"
            size="xs"
            {...form.getInputProps('date')}
          />
        </InputCell>
        <InputCell>
          <NativeSelect
            required
            data={accountsList}
            form={FORM_ID}
            size="xs"
            {...form.getInputProps('account')}
          />
        </InputCell>
        <InputCell>
          <TextInput
            required
            form={FORM_ID}
            placeholder="Payee"
            size="xs"
            {...form.getInputProps('description')}
          />
        </InputCell>
        <td colSpan={2} style={{ textAlign: 'right' }}>
          Amount remaining:
        </td>
        <InputCell>
          <NumberInput
            hideControls
            required
            decimalSeparator="."
            form={FORM_ID}
            precision={2}
            size="xs"
            {...form.getInputProps('credit.0')}
          />
        </InputCell>
        <InputCell>
          <NumberInput
            hideControls
            required
            decimalSeparator="."
            form={FORM_ID}
            precision={2}
            size="xs"
            {...form.getInputProps('debit.0')}
          />
        </InputCell>
      </tr>
      {renderSubrecordRows()}
    </>
  );
};

/*
      <InputCell>
        <Select
          required
          searchable
          switchDirectionOnFlip
          data={categoriesList}
          form={FORM_ID}
          size="xs"
          {...form.getInputProps('categories.0')}
        />
      </InputCell>
      <InputCell>
        <TextInput
          required
          form={FORM_ID}
          placeholder="Notes"
          size="xs"
          {...form.getInputProps('Notes')}
        />
      </InputCell>
      <InputCell>
        <NumberInput
          hideControls
          required
          decimalSeparator="."
          form={FORM_ID}
          precision={2}
          size="xs"
          {...form.getInputProps('credit')}
        />
      </InputCell>
      <InputCell>
        <NumberInput
          hideControls
          required
          decimalSeparator="."
          form={FORM_ID}
          precision={2}
          size="xs"
          {...form.getInputProps('debit')}
        />
 */
