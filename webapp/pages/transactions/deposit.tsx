/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import { getCategoryList } from '../../client-lib';

import { Page } from '../../components';

const Deposit: FC = () => {
  // Get sorted categories and balances
  const { error, data: catData } = useSWR('/api/categories');
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

  if (!catData) {
    return <Loader variant="bars" />;
  }

  const categories = getCategoryList(catData);
  console.log(categories);
  return (
    <Page>
      <div>Hello deposit!</div>
    </Page>
  );
};

export default Deposit;
