/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React from 'react';

import { formatClientDate } from '../../../client-lib';
import { useAllAccounts } from '../../../client-lib/api/use-all-accounts';
import { useAllCategories } from '../../../client-lib/api/use-all-categories';
import { useAllTransactions } from '../../../client-lib/api/use-all-transactions';
import {
  getFriendlyAccountName
} from '../../../client-lib/get-friendly-account-name';
import { TransactionRow } from '../../../client-lib/types';
import { Page, TransactionTableV2 } from '../../../components';
import { getFriendlyCategoryName } from '../../../shared-lib'; // TODO This function should live in `client-lib`
import { ModelSchema } from '../../../shared-lib/schema-v2/model-schema';

function getAccountNameIfAvailable(accountId: string, accounts?: ModelSchema.Account[]) {
  if (!accounts) {
    return '...';
  }

  return getFriendlyAccountName(accounts, accountId);
}

function getCategoryNameIfAvailable(categoryId: string, categories?: ModelSchema.Category[]) {
  if (!categories) {
    return '...';
  }

  return getFriendlyCategoryName(categories, categoryId);
}

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

    const txnData = transactions.map((transaction) => {
      const accountSubrecords = transaction.accounts.map(
        (account): TransactionRow => ({
          date: '',
          account: getAccountNameIfAvailable(account.accountId, accounts),
          description: '',
          category: '',
          notes: '',
          credit: account.credit,
          debit: account.debit,
        })
      );
      const categorySubrecords = transaction.categories.map(
        (category): TransactionRow => ({
          date: '',
          account: '',
          description: '',
          category: getCategoryNameIfAvailable(category.categoryId, categories),
          notes: '',
          credit: category.credit,
          debit: category.debit,
        })
      );
      return {
        account: '',
        credit: 0,
        category: '',
        date: formatClientDate(transaction.date),
        debit: 0,
        description: transaction.description,
        notes: '',
        subrecords: accountSubrecords.concat(categorySubrecords),
      };
    });
    setData(txnData);
  }, [accounts, transactions]);

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
