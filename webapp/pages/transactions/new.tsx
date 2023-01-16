/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { FinancialAccount } from '@prisma/client';
import { FC } from 'react';
import useSWR from 'swr';

import { buildCategoryTree, getCategoryList } from '../../client-lib';
import { RawCategory } from '../../client-lib/types';
import { NewTransactionForm, Page } from '../../components';

const NewTransaction: FC = () => {
  // Get accounts and categories
  const { error: accountsError, data: accountsData } =
    useSWR<FinancialAccount[]>('/api/accounts');
  const { error: categoriesError, data: categoriesData } =
    useSWR<RawCategory[]>('/api/categories');
  if (accountsError || categoriesError) {
    console.error(accountsError ?? categoriesError);
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

  if (!accountsData || !categoriesData) {
    return <Loader variant="bars" />;
  }

  const categories = getCategoryList(buildCategoryTree(categoriesData));
  return (
    <Page>
      <h1>Budget Plan</h1>
      <div>
        <NewTransactionForm accounts={accountsData} categories={categories} />
      </div>
    </Page>
  );
};

export default NewTransaction;
