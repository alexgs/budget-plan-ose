/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FinancialAccount } from '@prisma/client';
import { FC } from 'react';
import useSWR from 'swr';

import {
  buildCategoryTree,
  formatClientDate,
  getCategoryList
} from '../../client-lib';
import { NewTransactionFormValues, RawCategory } from '../../client-lib/types';
import { DepositForm, Page } from '../../components';
import { ApiSchema, dollarsToCents, TRANSACTION_TYPES } from '../../shared-lib';

const Deposit: FC = () => {
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

  const accounts = accountsData.map((account) => ({
    value: account.id,
    label: account.description,
  }));
  const categories = getCategoryList(buildCategoryTree(categoriesData));

  async function requestPostDeposit(values: NewTransactionFormValues) {
    const categories: ApiSchema.NewTransactionCategory[] = values.categories
      .filter((category) => category.amount !== 0)
      .map((category) => {
        return {
          amount: dollarsToCents(category.amount),
          categoryId: category.categoryId,
          isCredit: true,
        };
      });
    const { balance, isCredit, ...otherValues } = values;
    const payload: ApiSchema.NewTransaction = {
      ...otherValues,
      categories,
      accounts:[{
        ...otherValues.accounts[0],
        amount: dollarsToCents(balance),
      }],
      type: TRANSACTION_TYPES.DEPOSIT,
    };

    const responseData = await fetch('/api/transactions', {
      body: JSON.stringify({
        ...payload,
        date: formatClientDate(values.date),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .catch((e) => {
        console.error(e);
        showNotification({
          color: 'red',
          message: 'Something went wrong! Please check the logs.',
          title: 'Error',
        });
      });

    showNotification({
      message: `Saved deposit "${responseData.description}"`,
      title: 'Success',
    });
  }

  return (
    <Page>
      <DepositForm accounts={accounts} categories={categories} onSubmit={requestPostDeposit}/>
    </Page>
  );
};

export default Deposit;
