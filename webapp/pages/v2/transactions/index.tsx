/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';

import { api, getRows } from '../../../client-lib';
import { TransactionRow } from '../../../client-lib/types';
import { Page, TransactionTableV2 } from '../../../components';

function NewTablePage() {
  // TODO Handle errors
  const { error: accountsError, accounts } = api.useAllAccounts();
  const { error: categoriesError, categories } = api.useAllCategories();
  const { error, transactions } = api.useAllTransactions();
  const [data, setData] = React.useState<TransactionRow[]>(() => []);
  const [globalFilter, setGlobalFilter] = React.useState('');

  React.useEffect(() => {
    if (!transactions) {
      return;
    }

    setData(getRows(transactions, accounts, categories));
  }, [accounts, categories, transactions]);

  const [debouncedFilter] = useDebouncedValue(globalFilter, 200);

  if (transactions) {
    return (
      <Page>
        <TextInput
          label="Search"
          value={globalFilter}
          style={{ flex: 1 }}
          onChange={(event) => setGlobalFilter(event.currentTarget.value)}
        />
        <TransactionTableV2
          accounts={accounts}
          data={data}
          filter={debouncedFilter}
        />
      </Page>
    );
  }

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

  return <Loader variant="bars" />;
}

export default NewTablePage;
