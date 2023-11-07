/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import {
  getFriendlyAccountName
} from '../../client-lib/get-friendly-account-name';
import { TransactionRow } from '../../client-lib/types';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { ChevronButton } from './ChevronButton';
import { DollarAmountRenderer } from './DollarAmountRenderer';

const columnHelper = createColumnHelper<TransactionRow>();

function renderAccountName(accountId: string, accounts?: ModelSchema.Account[]) {
  if (!accounts) {
    return '...';
  }

  return getFriendlyAccountName(accounts, accountId);
}

export interface Options {
  accounts?: ModelSchema.Account[];
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
      size: 40,
    }),
    columnHelper.accessor('date', {
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      header: 'Date',
      size: 125,
    }),
    columnHelper.accessor('account', {
      cell: (info) => renderAccountName(info.getValue(), opt.accounts),
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
      cell: (info) => <DollarAmountRenderer amountInCents={info.getValue()} />,
      header: 'Credit',
      size: 50,
    }),
    columnHelper.accessor('debit', {
      cell: (info) => <DollarAmountRenderer amountInCents={info.getValue()} />,
      header: 'Debit',
      size: 50,
    }),
  ];

  return output;
}
