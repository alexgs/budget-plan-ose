/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Group,
  NativeSelect,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import { api, buildCategoryTree, getCategoryList } from '../../client-lib';

export const FORM_ID = 'transaction-form';

// Using "!important" is not great, but I'm not sure how to make the CSS selectors more specific
const BottomRow = styled.tr({
  td: {
    borderTop: 'none !important',
    paddingTop: '0 !important',
  },
});

const InputCell = styled.td({
  paddingLeft: '0 !important',
  paddingRight: '5px !important',

  '& input, & select': {
    paddingLeft: 6,
  },
});

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

  const form = useForm({
    initialValues: {
      account: accountsList[0].value,
      categories: categoriesList[0].value,
      date: new Date(), // TODO Scrub the timezone from the date before sending it to the backend
      description: '',
      notes: '',
      credit: 0,
      debit: 0,
    },
  });

  function handleCancelClick() {
    // TODO Reset form state
    props.onCancel();
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
        <InputCell>
          <Select
            required
            searchable
            switchDirectionOnFlip
            data={categoriesList}
            form={FORM_ID}
            size="xs"
            {...form.getInputProps('categories')}
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
        </InputCell>
      </tr>
      <BottomRow>
        <td colSpan={4} />
        <InputCell>
          <Button
            fullWidth
            leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            size="xs"
            variant="subtle"
          >
            Split
          </Button>
        </InputCell>
        <td colSpan={3}>
          <Group position="right">
            <Button onClick={handleCancelClick} size="xs" variant="subtle">
              Cancel
            </Button>
            <Button size="xs">Save</Button>
          </Group>
        </td>
      </BottomRow>
    </>
  );
};
