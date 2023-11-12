/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table } from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import useSWR from 'swr';
import {
  formatSubrecordAmount
} from '../../client-lib/format-subrecord-amount';

import { AddCategoryButton, Page } from '../../components';
import { space } from '../../components/tokens';
import {
  Account,
  ApiSchema,
  Category,
  getFriendlyAccountName, getFriendlyCategoryName
} from '../../shared-lib';

interface TransactionRow {
  date: string;
  account: string;
  description: string;
  category: string;
  notes: string;
  amount: string;
}

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
  const { error: txnError, data: txnData } = useSWR<ApiSchema.Transaction[]>(
    '/api/transactions',
    { refreshInterval: 1000 }
  );

  const { error: accountError, data: accountData } = useSWR<Account[]>(
    '/api/accounts',
    { refreshInterval: 1000 }
  );

  const { error: categoryError, data: categoryData } = useSWR<Category[]>(
    '/api/categories',
    { refreshInterval: 1000 }
  );
  const anyError = accountError ?? categoryError ?? txnError;

  const data = React.useMemo((): TransactionRow[] => {
    if (accountData && categoryData && txnData) {
      return txnData.map((txn) => {
        if (txn.accounts.length > 0 && txn.categories.length > 0) {
          return {
            date: txn.date,
            account: getFriendlyAccountName(
              accountData,
              txn.accounts[0].accountId
            ),
            description: txn.description,
            category: getFriendlyCategoryName(
              categoryData,
              txn.categories[0].categoryId
            ),
            notes: '',
            amount: formatSubrecordAmount(txn.categories[0]),
          };
        } else {
          return {
            date: '0000-00-00',
            amount: '0',
            account: 'Unknown',
            category: 'Unknown',
            description: 'Unknown',
            notes: 'Unknown',
          }
        }
      });
    } else {
      return [
        {
          date: '0000-00-00',
          amount: '0',
          account: 'Unknown',
          category: 'Unknown',
          description: 'Unknown',
          notes: 'Unknown',
        }
      ]
    }
  }, [accountData, categoryData, txnData]);

  // const [data, _setData] = React.useState(() => [...initialData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (anyError) {
    console.error(anyError);
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

  if (!accountData || !categoryData || !txnData) {
    return <Loader variant="bars" />;
  }

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
