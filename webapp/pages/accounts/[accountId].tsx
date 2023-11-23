/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { api } from '../../client-lib';

import { Page, TransactionTable } from '../../components';
import { ApiSchema } from '../../shared-lib';

const AccountDetail: React.FC = () => {
  const router = useRouter();
  const { accountId } = router.query as { accountId: string };

  const { error: txnError, transactions: txnData } =
    api.useAccountTransactions(accountId);

  const { error: accountError, accounts: accountData } = api.useAllAccounts();

  const { error: categoryError, categories: categoryData } =
    api.useAllCategories();

  const anyError = accountError ?? categoryError ?? txnError;
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
      <TransactionTable
        accountData={accountData}
        accountId={accountId}
        categoryData={categoryData}
        txnData={txnData}
      />
    </Page>
  );
};

export default AccountDetail;
