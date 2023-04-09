/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { Account, ApiSchema, Category } from '../../shared-lib';
import { TransactionTableDisplay } from './TransactionTableDisplay';

interface Props {
  accountData: Account[];
  accountId?: string;
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTableContainer: React.FC<Props> = (props) => {
  // TODO Pagination, sorting and filtering will be handled here
  return (
    <TransactionTableDisplay
      accountData={props.accountData}
      categoryData={props.categoryData}
      txnData={props.txnData}
    />
  );
};
