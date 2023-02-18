/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { TransactionRow } from '../../client-lib/types';

import { Page, TransactionTable } from '../../components';

const placeholderData: TransactionRow[] = [
  {
    account: 'Big bank checking',
    amount: 1000,
    category: 'Fun!',
    date: new Date('2023-02-02'),
    description: 'Cocaine',
    order: 1000,
    status: 'Pending',
  },
  {
    account: 'Big bank savings',
    amount: 4567,
    category: 'Serious',
    date: new Date('2023-02-04'),
    description: 'Investment',
    order: 1001,
    status: 'Pending',
  },
];


const Transactions: React.FC = () => {
  return (
    <Page>
      <TransactionTable data={placeholderData} />
    </Page>
  );
};

export default Transactions;
