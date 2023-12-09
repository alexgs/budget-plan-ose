/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';
import { ChevronButton } from './ChevronButton';
import { DollarAmountRenderer } from './DollarAmountRenderer';
import { MeatballMenu } from './MeatballMenu';

const columnHelper = createColumnHelper<TransactionRow>();

export interface Options {
  showAccountColumn?: boolean;
}

export function getColumnDefs(options?: Options) {
  // TODO Use `opt` object to control which columns are shown
  const opt = {
    showAccountColumn: true,
    ...options,
  };

  const output = [
    columnHelper.display({
      id: 'expander',
      cell: ({ row }) => <ChevronButton row={row} />,
      enableResizing: false,
      size: 30,
    }),
    columnHelper.accessor('date', {
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      header: 'Date',
      size: 125,
    }),
    columnHelper.accessor('account', {
      cell: (info) => info.getValue(),
      header: 'Account',
      size: 125,
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.getValue(),
      header: 'Description',
      size: 190,
    }),
    columnHelper.accessor('category', {
      cell: (info) => info.getValue(),
      header: 'Category',
      size: 125,
    }),
    columnHelper.accessor('notes', {
      cell: (info) => info.getValue(),
      header: 'Notes',
      size: 120,
    }),
    columnHelper.accessor('credit', {
      cell: (info) => <DollarAmountRenderer amountInCents={info.getValue()} />,
      header: 'Credit',
      size: 90,
    }),
    columnHelper.accessor('debit', {
      cell: (info) => <DollarAmountRenderer amountInCents={info.getValue()} />,
      header: 'Debit',
      size: 90,
    }),
    columnHelper.display({
      id: 'meatballs',
      cell: ({ row }) => <MeatballMenu row={row} />,
      enableResizing: false,
      size: 30,
    })
  ];

  return output;
}
