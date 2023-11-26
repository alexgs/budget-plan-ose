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

const BottomRow = styled.tr({
  td: {
    // This is not great, but I'm not sure how to make the CSS selector more specific
    borderTop: 'none !important',
    paddingTop: '0 !important',
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

  // TODO It will require some CSS finagling to turn off the border between rows
  // TODO Set `padding-left: 0; padding-right: 5px` on the input cells
  return (
    <>
      <tr>
        <td />
        <td>
          <DatePicker
            allowFreeInput
            required
            form={FORM_ID}
            inputFormat="YYYY-MM-DD"
            {...form.getInputProps('date')}
          />
        </td>
        <td>
          <NativeSelect
            required
            data={accountsList}
            form={FORM_ID}
            {...form.getInputProps('account')}
          />
        </td>
        <td>
          <TextInput
            required
            form={FORM_ID}
            placeholder="Payee"
            {...form.getInputProps('description')}
          />
        </td>
        <td>
          <Select
            required
            searchable
            switchDirectionOnFlip
            data={categoriesList}
            form={FORM_ID}
            {...form.getInputProps('categories')}
          />
        </td>
        <td>
          <TextInput
            required
            form={FORM_ID}
            placeholder="Notes"
            {...form.getInputProps('Notes')}
          />
        </td>
        <td>
          <NumberInput
            hideControls
            required
            decimalSeparator="."
            form={FORM_ID}
            precision={2}
            {...form.getInputProps('credit')}
          />
        </td>
        <td>
          <NumberInput
            hideControls
            required
            decimalSeparator="."
            form={FORM_ID}
            precision={2}
            {...form.getInputProps('debit')}
          />
        </td>
      </tr>
      <BottomRow>
        <td colSpan={4} />
        <td>
          <Button
            fullWidth
            leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            variant="subtle"
          >
            Split
          </Button>
        </td>
        <td colSpan={3}>
          <Group position="right">
            <Button compact onClick={handleCancelClick} variant="subtle">
              Cancel
            </Button>
            <Button>Save</Button>
          </Group>
        </td>
      </BottomRow>
    </>
  );
};
