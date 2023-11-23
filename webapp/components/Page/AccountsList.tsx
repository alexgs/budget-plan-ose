/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faPiggyBank,
  faTriangleExclamation,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Divider, Loader, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { api } from '../../client-lib';
import { FinancialAccount } from '../../client-lib/types';

export const AccountsList: React.FC = () => {
  const router = useRouter();

  const { error, accounts: accountsData } = api.useAllAccounts();
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

  if (!accountsData) {
    return <Loader variant="bars" />;
  }

  // TODO The "active" conditional doesn't work correctly
  const content = accountsData.map((account: FinancialAccount) => {
    const accountPath = `/accounts/${account.id}`;
    return (
      <Link key={account.id} href={accountPath} passHref>
        <NavLink
          active={router.pathname === accountPath}
          component="a"
          label={account.description}
          icon={<FontAwesomeIcon icon={faPiggyBank} />}
        />
      </Link>
    );
  });

  return (
    <div>
      <Divider my="sm" />
      <Link key="all-transactions" href="/transactions" passHref>
        <NavLink
          active={router.pathname === '/transactions'}
          component="a"
          label="All Transactions"
          icon={<FontAwesomeIcon icon={faPiggyBank} />}
        />
      </Link>
      {content}
    </div>
  );
};
