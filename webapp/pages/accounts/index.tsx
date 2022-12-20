import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { Page } from '../../components';

const AccountsPage: React.FC = () => {
  const { error, data: accountsData } = useSWR('/api/accounts');
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

  if (!accountsData) {
    return <Loader variant="bars" />;
  }

  const rows = accountsData.map((account: any) => (
    <tr key={account.id}>
      <td>{account.description}</td>
      <td>{account.accountType}</td>
    </tr>
  ));
  // console.log(accountsData);

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Page>
  );
};

export default AccountsPage;
