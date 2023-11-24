/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
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
import { HeaderCell, Resizer } from './HeaderCell';
import { FORM_ID, TransactionForm } from './TransactionForm';
import { fuzzyFilter } from './fuzzy-filter';
import { getColumnDefs } from './get-column-defs';

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

  function renderNewTxnForm() {
    if (props.showNewTxnForm) {
      return (
        <TransactionForm
          columnCount={columns.length}
          onCancel={props.onCancel}
        />
      );
    }
    return null;
  }

  return (
    <>
      <form id={FORM_ID}></form>
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
