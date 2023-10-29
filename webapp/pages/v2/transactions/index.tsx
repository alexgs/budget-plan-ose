/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ExpandedState,
  FilterFn,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { useAllTransactions } from '../../../client-lib/api/use-all-transactions';
import { Page } from '../../../components';

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
  credit: number;
  debit: number;
  subrecords?: TransactionRow[];
}

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
  columnHelper.accessor('credit', {
    cell: (info) => info.getValue(),
    header: 'Credit',
  }),
  columnHelper.accessor('debit', {
    cell: (info) => info.getValue(),
    header: 'Debit',
  }),
];

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function NewTablePage() {
  const { error, transactions } = useAllTransactions();
  const [data, setData] = React.useState<TransactionRow[]>(() => []);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  React.useEffect(() => {
    if (!transactions) {
      return;
    }

    const txnData = transactions.map((transaction) => {
      const accountSubrecords = transaction.accounts.map(
        (account): TransactionRow => ({
          date: '',
          account: account.accountId,
          description: '',
          category: '',
          notes: '',
          credit: account.credit,
          debit: account.debit,
        })
      );
      const categorySubrecords = transaction.categories.map(
        (category): TransactionRow => ({
          date: '',
          account: '',
          description: '',
          category: category.categoryId,
          notes: '',
          credit: category.credit,
          debit: category.debit,
        })
      );
      return {
        account: '',
        credit: 0,
        category: '',
        date: transaction.date.toISOString(),
        debit: 0,
        description: transaction.description,
        notes: '',
        subrecords: accountSubrecords.concat(categorySubrecords),
      };
    });
    setData(txnData);
  }, [transactions]);

  const [debouncedFilter] = useDebouncedValue(globalFilter, 200);
  const table = useReactTable({
    columns,
    data,
    columnResizeMode: 'onChange',
    debugTable: false,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subrecords,
    globalFilterFn: fuzzyFilter,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      expanded,
      globalFilter: debouncedFilter,
    },
  });

  if (transactions) {
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
      </Page>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Alert
        color="red"
        icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
        title="Error!"
      >
        A network error occurred. Please check the console logs for details.
      </Alert>
    );
  }

  return <Loader variant="bars" />;
}

export default NewTablePage;
