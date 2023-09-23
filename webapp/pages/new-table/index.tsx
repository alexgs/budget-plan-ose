/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { AddCategoryButton, Page } from '../../components';
import { space } from '../../components/tokens';

interface TransactionRow {
  date: string;
  account: string;
  description: string;
  category: string;
  notes: string;
  amount: number;
}

const initialData: TransactionRow[] = [
  {
    date: '2021-01-01',
    account: 'Account 1',
    description: 'Transaction 1',
    category: 'Category 1',
    notes: 'Notes 1',
    amount: 100,
  },
];

const columnHelper = createColumnHelper<TransactionRow>();

const columns = [
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('account', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('category', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('notes', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    cell: (info) => info.getValue(),
  }),
];

function NewTablePage() {
  const [data, _setData] = React.useState(() => [...initialData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Description</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
