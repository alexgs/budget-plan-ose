/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import React from 'react';

import { api } from '../../client-lib';
import { TransactionTable, Page } from '../../components';
import { ApiSchema } from '../../shared-lib';

const Transactions: React.FC = () => {
  const { error: txnError, transactions: txnData } =
    api.useAllTransactions() as {
      error?: Error;
      transactions?: ApiSchema.Transaction[];
    };
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
        categoryData={categoryData}
        txnData={txnData}
      />
    </Page>
  );
};

export default Transactions;
