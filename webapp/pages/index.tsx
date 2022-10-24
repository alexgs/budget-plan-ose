/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table } from '@mantine/core';
import useSWR from 'swr';

import { buildCategoryTree, parseCategoryTree } from '../client-lib';
import { CategoryTreeNode } from '../client-lib/types';
import { Page } from '../components';

function HomePage() {
  // TODO Tighten security so I'm the only one who can access this app

  // Get sorted categories and balances
  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
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

  if (!catData) {
    return <Loader variant="bars" />;
  }

  const catTree: CategoryTreeNode[] = buildCategoryTree(catData);
  const topLevelBalances = parseCategoryTree(catTree, 0);
  const rows = topLevelBalances.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.balance}</td>
    </tr>
  ));

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Page>
  );
}

export default HomePage;
