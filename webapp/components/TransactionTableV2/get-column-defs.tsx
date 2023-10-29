/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';

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
      cell: ({ row }) => (
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
          )}
        </div>
      ),
      enableResizing: false,
      size: 40,
    }),
    columnHelper.accessor('date', {
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      header: 'Date',
      size: 50,
    }),
    columnHelper.accessor('account', {
      cell: (info) => info.getValue(),
      header: 'Account',
      size: 50,
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.getValue(),
      header: 'Description',
      size: 450,
    }),
    columnHelper.accessor('category', {
      cell: (info) => info.getValue(),
      header: 'Category',
      size: 50,
    }),
    columnHelper.accessor('notes', {
      cell: (info) => info.getValue(),
      header: 'Notes',
      size: 300,
    }),
    columnHelper.accessor('credit', {
      cell: (info) => info.getValue(),
      header: 'Credit',
      size: 50,
    }),
    columnHelper.accessor('debit', {
      cell: (info) => info.getValue(),
      header: 'Debit',
      size: 50,
    }),
  ];

  return output;
}