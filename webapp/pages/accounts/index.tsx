import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, Table } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { FinancialAccount } from '../../client-lib/types';
import { NewAccountButton, Page } from '../../components';
import {
  EditAccountButton
} from '../../components/NewAccount/EditAccountButton';
import { space } from '../../components/tokens';
import { getFriendlyAccountType } from '../../shared-lib';

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

  const rows = accountsData.map((account: FinancialAccount) => (
    <tr key={account.id}>
      <td>{account.description}</td>
      <td>{getFriendlyAccountType(account.accountType)}</td>
      <td style={{ textAlign: 'right' }}><EditAccountButton /></td>
    </tr>
  ));

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Type</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <div style={{ marginTop: space.xl }}>
        <NewAccountButton />
      </div>
    </Page>
  );
};

export default AccountsPage;
