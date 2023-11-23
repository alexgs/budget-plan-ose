/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { FC } from 'react';

import { api, buildCategoryTree, getCategoryList } from '../../client-lib';
import { Page } from '../../components';

const NewTransaction: FC = () => {
  // Get accounts and categories
  const { error: accountsError, accounts: accountsData } =
    api.useAllAccounts();
  const { error: categoriesError, categories: categoriesData } =
    api.useAllCategories();
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
        Nothing to see here (component was removed)
      </div>
    </Page>
  );
};

export default NewTransaction;
