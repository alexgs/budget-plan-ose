/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table } from '@mantine/core';
import useSWR from 'swr';

import { formatAmount, getCategoryList } from '../client-lib';
import { AddCategory, Page } from '../components';
import { space } from '../components/tokens';

function HomePage() {
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

  const topLevelBalances = getCategoryList(catData);
  const rows = topLevelBalances.map((row) => (
    <tr key={row.id}>
      <td>{row.label}</td>
      <td>{formatAmount(row.balance)}</td>
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
      <div style={{ marginTop: space.xl }}>
        <AddCategory />
      </div>
    </Page>
  );
}

export default HomePage;
