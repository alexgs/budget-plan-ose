/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, NumberInput, Table } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import { getCategoryList } from '../../client-lib';

import { Page } from '../../components';

const Deposit: FC = () => {
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

  const categories = getCategoryList(catData);
  console.log(categories);
  const rows = categories.map((row) => {
    const input = row.isLeaf ? (
      <NumberInput decimalSeparator="." hideControls precision={2} required />
    ) : null;
    return (
      <tr key={row.id}>
        <td style={{ paddingLeft: 10 + 16 * row.depth }}>{row.label}</td>
        <td>{row.balance}</td>
        <td>{input}</td>
      </tr>
    );
  });

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Current Balance</th>
            <th>Deposit Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Page>
  );
};

export default Deposit;
