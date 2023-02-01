/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faPencil,
  faTriangleExclamation,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table, UnstyledButton } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';

import {
  buildCategoryTree,
  formatAmount,
  getCategoryList,
} from '../client-lib';
import { AddCategory, Page } from '../components';
import { space } from '../components/tokens';

function HomePage() {
  // Get sorted categories and balances
  const { error, data: catData } = useSWR('/api/categories', {
    refreshInterval: 1000,
  });
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

  const topLevelBalances = getCategoryList(buildCategoryTree(catData));
  const rows = topLevelBalances.map((row) => (
    <tr key={row.id}>
      <td>{row.label}</td>
      <td>{formatAmount(row.balance)}</td>
      <td style={{ textAlign: 'right' }}>
        <UnstyledButton>
          <FontAwesomeIcon icon={faPencil} />
        </UnstyledButton>
      </td>
    </tr>
  ));

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Balance</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <div style={{ marginTop: space.xl }}>
        <AddCategory />
      </div>
    </Page>
  );
}

export default HomePage;
