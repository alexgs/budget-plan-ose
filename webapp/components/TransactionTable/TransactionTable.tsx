/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { formatAmount, formatClientDate } from '../../client-lib';
import { TransactionRow } from '../../client-lib/types';


const columnHelper = createColumnHelper<TransactionRow>();
const columns = [
  columnHelper.accessor('date', {
    cell: (info) => formatClientDate(info.getValue()),
    header: () => <span>Date</span>,
  }),
  columnHelper.accessor('account', {
    cell: (info) => info.getValue(),
    header: () => <span>Account</span>,
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
  }),
  columnHelper.accessor('category', {
    cell: (info) => info.getValue(),
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor('amount', {
    cell: (info) => formatAmount(info.getValue()),
    header: () => <span>Amount</span>,
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
  }),
];

interface Props {
  data: TransactionRow[]
}

export const TransactionTable: React.FC<Props> = (props) => {
  const table = useReactTable({
    columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
  });

  function renderHeaders() {
    return table.getFlatHeaders().map((header) => {
      return (
        <th key={header.id}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      );
    });
  }

  function renderRows() {
    return table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <Table>
      <thead>
        <tr>{renderHeaders()}</tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </Table>
  );
};
