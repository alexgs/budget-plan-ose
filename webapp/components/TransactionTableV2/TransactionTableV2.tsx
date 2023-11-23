/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Button, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { BodyRow } from './BodyRow';
import { fuzzyFilter } from './fuzzy-filter';
import { getColumnDefs } from './get-column-defs';
import { HeaderCell, Resizer } from './HeaderCell';

interface Props {
  accounts?: ModelSchema.Account[];
  data: TransactionRow[];
  filter?: string;
  onCancel: VoidFunction;
  showNewTxnForm?: boolean;
}

const columns = getColumnDefs();

export const TransactionTableV2: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const form = useForm({
    initialValues: {
      email: '',
    },
  });

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

  function renderBodyRows() {
    return table
      .getRowModel()
      .rows.map((row) => <BodyRow key={row.id} row={row} />);
  }

  function handleCancelClick() {
    props.onCancel();
  }

  function renderNewTxnForm() {
    if (props.showNewTxnForm) {
      // TODO It will require some CSS finagling to turn off the border between rows
      return (
        <>
          <tr>
            <td />
            <td>
              <TextInput
                withAsterisk
                form="new-txn-form"
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={columns.length}>
              <Button onClick={handleCancelClick}>Cancel</Button>
            </td>
          </tr>
        </>
      );
    }
    return null;
  }

  return (
    <>
      <form id="new-txn-form"></form>
      <Table style={{ width: table.getCenterTotalSize() }}>
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
