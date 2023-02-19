/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { utcToZonedTime } from 'date-fns-tz';
import React from 'react';
import useSWR from 'swr';

import { TransactionRow } from '../../client-lib/types';
import { Page, TransactionTable } from '../../components';
import { Account, ApiSchema, Category } from '../../shared-lib';

const Transactions: React.FC = () => {
  const { error: txnError, data: txnData } = useSWR<ApiSchema.Transaction[]>('/api/transactions', {
    refreshInterval: 1000,
  });

  const { error: accountError, data: accountData } = useSWR<Account[]>('/api/accounts', {
    refreshInterval: 1000,
  });

  const { error: categoryError, data: categoryData } = useSWR<Category[]>('/api/categories', {
    refreshInterval: 1000,
  });

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

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const transactionData: TransactionRow[] = txnData.map((txn) => {
    const amount = txn.amounts[0];
    return {
      account: accountData.find(account => account.id === amount.accountId)?.description ?? 'Unknown',
      amount: amount.amount,
      category: categoryData.find(category => category.id === amount.categoryId)?.name ?? 'Unknown',
      date: utcToZonedTime(txn.date, timezone),
      description: txn.description,
      order: txn.order,
      status: amount.status,
    }
  });

  return (
    <Page>
      <TransactionTable data={transactionData} />
    </Page>
  );
};

export default Transactions;
