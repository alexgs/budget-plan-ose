/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import React from 'react';

import { Account, ApiSchema, Category } from '../../shared-lib';

import { BasicRow, SplitAccountRow, SplitCategoryRow } from './Rows';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTable: React.FC<Props> = (props) => {
  function renderRows() {
    return props.txnData.map((txn) => {
      if (txn.accounts.length === 1 && txn.categories.length > 1) {
        return (
          <SplitCategoryRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.accounts.length > 1 && txn.categories.length === 1) {
        return (
          <SplitAccountRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      // Default option
      return (
        <BasicRow
          key={txn.id}
          accountData={props.accountData}
          categoryData={props.categoryData}
          txn={txn}
        />
      );
    });
  }

  return (
    <Table>
      <thead>
        <tr>
          <th />{/* Checkbox, maybe other controls */}
          <th>Date</th>
          <th>Account</th>
          <th>Description</th>
          <th>Category</th>
          <th>Notes</th>
          <th>Amount</th>
          <th />{/* Status icons (pending, cleared, etc.), maybe other controls */}
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </Table>
  );
};
