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
import { Page } from '../../components';

interface TransactionRow {
  account: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
  status: string;
}

const placeholderData: TransactionRow[] = [
  {
    account: 'Big bank checking',
    amount: 1000,
    category: 'Fun!',
    date: new Date('2023-02-02'),
    description: 'Cocaine',
    status: 'Pending',
  },
  {
    account: 'Big bank savings',
    amount: 1000,
    category: 'Serious',
    date: new Date('2023-02-04'),
    description: 'Investment',
    status: 'Pending',
  },
];

const columnHelper = createColumnHelper<TransactionRow>();
const columns = [
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
    header: () => <span>Date</span>,
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
  }),
];

const AccountDetail: React.FC = () => {
  const table = useReactTable({
    columns,
    data: placeholderData,
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

  return (
    <Page>
      <Table>
        <thead>
          <tr>{renderHeaders()}</tr>
        </thead>
      </Table>
    </Page>
  );
};

export default AccountDetail;
