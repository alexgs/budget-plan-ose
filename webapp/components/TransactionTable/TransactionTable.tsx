/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import React from 'react';
import { formatAmount } from '../../client-lib';

import { Account, ApiSchema, Category } from '../../shared-lib';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTable: React.FC<Props> = (props) => {
  function getFriendlyAccountName(accountId: string) {
    return props.accountData.find((account) => account.id === accountId)?.description ?? 'Unknown';
  }

  function getFriendlyCategoryName(categoryId: string) {
    return props.categoryData.find((category) => category.id === categoryId)?.name ?? 'Unknown';
  }

  function renderRows() {
    return props.txnData.map((txn) => (
      <tr key={txn.id}>
        <td />{/* Checkbox, maybe other controls */}
        <td>{txn.date}</td>
        <td>{getFriendlyAccountName(txn.accounts[0].accountId)}</td>
        <td>{txn.description}</td>
        <td>{getFriendlyCategoryName(txn.categories[0].categoryId)}</td>
        <td />{/* Notes */}
        <td>{formatAmount(txn.categories[0].amount)}</td>
        <td />{/* Status icons (pending, cleared, etc.), maybe other controls */}
      </tr>
    ));
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
      <tbody>
        {renderRows()}
      </tbody>
    </Table>
  );
};
