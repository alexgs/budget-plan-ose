/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { Table, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ExpandedState,
  FilterFn,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues
} from '@tanstack/react-table';
import React from 'react';

import { AddCategoryButton, Page } from '../../components';
import { space } from '../../components/tokens';

const HeaderCell = styled.th({
  position: 'relative',
});

const Resizer = styled.div({
  background: 'rgba(255, 0, 0, 0.5)',
  cursor: 'col-resize',
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  touchAction: 'none',
  userSelect: 'none',
  width: 5,

  '.isResizing': {
    background: 'blue',
    opacity: 1,
  },
});

interface TransactionRow {
  date: string;
  account: string;
  description: string;
  category: string;
  notes: string;
  amount: number;
  subrecords?: TransactionRow[];
}

const initialData: TransactionRow[] = [
  {
    date: '2021-01-01',
    account: '',
    description: 'Transaction 1',
    category: '',
    notes: '',
    amount: 0,
    subrecords: [
      {
        date: '',
        account: 'Account 1',
        description: '',
        category: '',
        notes: '',
        amount: 100,
      },
      {
        date: '',
        account: '',
        description: '',
        category: 'Category 1',
        notes: 'Notes 1',
        amount: 50,
      },
      {
        date: '',
        account: '',
        description: '',
        category: 'Category 2',
        notes: 'More notes',
        amount: 50,
      },
    ],
  },
];

const columnHelper = createColumnHelper<TransactionRow>();

const columns = [
  columnHelper.accessor('date', {
    cell: ({ row, getValue }) => (
      <div>
        {row.getCanExpand() ? (
          <button
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: 'pointer' }}
          >
            {row.getIsExpanded() ? '👇' : '👉'}
          </button>
        ) : (
          '🔵'
        )}{' '}
        {getValue()}
      </div>
    ),
    enableColumnFilter: false,
    header: 'Date',
  }),
  columnHelper.accessor('account', {
    cell: (info) => info.getValue(),
    header: 'Account',
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: 'Description',
  }),
  columnHelper.accessor('category', {
    cell: (info) => info.getValue(),
    header: 'Category',
  }),
  columnHelper.accessor('notes', {
    cell: (info) => info.getValue(),
    header: 'Notes',
  }),
  columnHelper.accessor('amount', {
    cell: (info) => info.getValue(),
    header: 'Amount',
  }),
];

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function NewTablePage() {
  const [data, _setData] = React.useState(() => [...initialData]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = React.useState('')

  const [debouncedFilter] = useDebouncedValue(globalFilter, 200);
  const table = useReactTable({
    columns,
    data,
    columnResizeMode: 'onChange',
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows: (row) => row.subrecords,
    globalFilterFn: fuzzyFilter,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      expanded,
      globalFilter: debouncedFilter,
    },
  });

  return (
    <Page>
      <TextInput
        label="Search"
        value={globalFilter}
        style={{ flex: 1 }}
        onChange={(event) => setGlobalFilter(event.currentTarget.value)}
      />
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
                  <Resizer
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={
                      header.column.getIsResizing() ? 'isResizing' : ''
                    }
                  />
                </HeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ marginTop: space.xl }}>
        <AddCategoryButton />
      </div>
    </Page>
  );
}

export default NewTablePage;
