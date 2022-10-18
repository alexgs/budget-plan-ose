/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Alert, Loader, Table } from '@mantine/core';
import useSWR from 'swr';

import { buildCategoryTree, parseCategoryTree } from '../client-lib';
import { categoryTreeNode } from '../client-lib/types';
import { AddCategory, AddTransactionButton, Page } from '../components';

function Budget() {
  // Get sorted categories and balances
  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
    return (
      <Alert title="Error!" color="red">
        A network error occurred. Please check the console logs for details.
      </Alert>
    );
  }

  if (!catData) {
    return <Loader variant="bars" />;
  }

  const catTree: categoryTreeNode[] = buildCategoryTree(catData);
  const topLevelBalances = parseCategoryTree(catTree, 0);
  const rows = topLevelBalances.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.balance}</td>
    </tr>
  ));

  return (
    <Page>
      <h1>Budget Plan</h1>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <AddCategory />
      <AddTransactionButton />
    </Page>
  );
}

export default Budget;
