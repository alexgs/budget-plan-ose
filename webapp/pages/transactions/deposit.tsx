/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FinancialAccount } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';

import { buildCategoryTree, getCategoryList } from '../../client-lib';
import { api } from '../../client-lib/api';
import { RawCategory } from '../../client-lib/types';
import { DepositForm, Page } from '../../components';
import { ApiSchema } from '../../shared-lib';

const Deposit: React.FC = () => {
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

  function handleSubmit(values: ApiSchema.NewTransaction) {
    api
      .postNewTransaction(values)
      .then((response) => response.json())
      .then((json) => {
        showNotification({
          message: `Saved transaction "${json.description}"`,
          title: 'Success',
        });
      })
      .catch((e) => {
        console.error(e);
        showNotification({
          color: 'red',
          message: 'Something went wrong! Please check the logs.',
          title: 'Error',
        });
      });
  }

  const accounts = accountsData.map((account) => ({
    value: account.id,
    label: account.description,
  }));
  const categories = getCategoryList(buildCategoryTree(categoriesData));

  return (
    <Page>
      <DepositForm
        accounts={accounts}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default Deposit;
