/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';

import { useAllAccounts } from '../../../client-lib/api/use-all-accounts';
import { useAllCategories } from '../../../client-lib/api/use-all-categories';
import { useAllTransactions } from '../../../client-lib/api/use-all-transactions';
import defaultRowConverter from '../../../client-lib/row-converters/default';
import { TransactionRow } from '../../../client-lib/types';
import { Page, TransactionTableV2 } from '../../../components';

function NewTablePage() {
  // TODO Handle errors
  const { error: accountsError, accounts } = useAllAccounts();
  const { error: categoriesError, categories } = useAllCategories();
  const { error, transactions } = useAllTransactions();
  const [data, setData] = React.useState<TransactionRow[]>(() => []);
  const [globalFilter, setGlobalFilter] = React.useState('');

  React.useEffect(() => {
    if (!transactions) {
      return;
    }

    const txnData = transactions.map((transaction) =>
      defaultRowConverter(transaction, accounts, categories)
    );
    setData(txnData);
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
