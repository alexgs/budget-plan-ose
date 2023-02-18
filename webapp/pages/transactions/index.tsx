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
import { ApiSchema } from '../../shared-lib';

const Transactions: React.FC = () => {
  const { error, data } = useSWR<ApiSchema.Transaction[]>('/api/transactions', {
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

  if (!data) {
    return <Loader variant="bars" />;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const transactionData: TransactionRow[] = data.map((txn) => {
    const amount = txn.amounts[0];
    return {
      account: amount.accountId,
      amount: amount.amount,
      category: amount.categoryId,
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
