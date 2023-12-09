/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { api, buildCategoryTree, getCategoryList } from '../../client-lib';
import { TransactionRow } from '../../client-lib/types';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { newTxnFormToApi } from '../../shared-lib/transformers/new-txn-form-to-api';

import { BodyRow } from './BodyRow';
import { HeaderCell, Resizer } from './HeaderCell';
import { FORM_ID, FormValues, TransactionForm } from './TransactionForm';
import { fuzzyFilter } from './fuzzy-filter';
import { getColumnDefs } from './get-column-defs';

interface Props {
  accounts?: ModelSchema.Account[];
  data: TransactionRow[];
  filter?: string;
  onCancel: VoidFunction;
  showNewTxnForm?: boolean;
}

export const TransactionTableV2: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [nowEditing, setNowEditing] = React.useState<string | null>(null);

  const columns = React.useMemo(
    () =>
      getColumnDefs({
        onEditClick: (transactionId: string) => {
          setNowEditing(transactionId);
        },
      }),
    []
  );

  const table = useReactTable({
    columns,
    columnResizeMode: 'onChange',
    data: props.data,
    debugTable: false,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subrecords,
    globalFilterFn: fuzzyFilter,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: (value) =>
      console.log('>> Global filter change:', value, '<<'),
    state: {
      expanded,
      globalFilter: props.filter,
    },
  });

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
      date: new Date(),
      description: '',
      notes: [''],
      credit: [0],
      debit: [0],
    },
    // TODO Add validation for the form data
  });

  async function executeFormSubmit(values: FormValues) {
    setIsSaving(true);
    const payload = newTxnFormToApi(values, accounts ?? []);
    try {
      const response = await api.saveNewTransaction(payload);

      if (response.ok) {
        showNotification({
          message: `Saved transaction "${values.description}"`,
          title: 'Success',
        });
      } else {
        showNotification({
          color: 'red',
          message: 'Response not ok! Please check the logs.',
          title: 'Error',
        });
      }
    } catch (e) {
      console.error(e);
      showNotification({
        color: 'red',
        message: 'Network error! Please check the logs.',
        title: 'Error',
      });
    } finally {
      setIsSaving(false);
    }
  }

  function handleFormError(errors: typeof form.errors) {
    console.error(errors);
  }

  function handleFormSubmit(values: FormValues) {
    // Make a copy of the form values before resetting the form
    const payload = { ...values };
    void executeFormSubmit(payload);

    // Reset the form, using the previous values for the account, category, and date
    const lastUsedCategoryId =
      payload.categories.length === 1
        ? payload.categories[0]
        : categoriesList[0].value;
    form.setValues({
      account: payload.account,
      categories: [lastUsedCategoryId],
      date: payload.date,
      description: '',
      notes: [''],
      credit: [0],
      debit: [0],
    });
  }

  function renderBodyRows() {
    return table
      .getRowModel()
      .rows.map((row) => <BodyRow key={row.id} row={row} />);
  }

  function renderNewTxnForm() {
    if (props.showNewTxnForm) {
      return (
        <TransactionForm
          accountsList={accountsList}
          categoriesList={categoriesList}
          columnCount={columns.length}
          form={form}
          isSaving={isSaving}
          onCancel={props.onCancel}
        />
      );
    }
    return null;
  }

  return (
    <>
      <form
        id={FORM_ID}
        onSubmit={form.onSubmit(handleFormSubmit, handleFormError)}
      ></form>
      <Table
        fontSize="xs"
        horizontalSpacing={6}
        style={{ width: table.getCenterTotalSize() }}
        verticalSpacing={4}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderCell
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getCanResize() ? (
                    <Resizer
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }
                    />
                  ) : null}
                </HeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {renderNewTxnForm()}
          {renderBodyRows()}
        </tbody>
      </Table>
    </>
  );
};
