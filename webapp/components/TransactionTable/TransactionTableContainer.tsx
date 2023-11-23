/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { Account, ApiSchema, Category } from '../../shared-lib';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { TransactionTableDisplay } from './TransactionTableDisplay';

interface Props {
  accountData: Account[];
  accountId?: string;
  categoryData: Category[];
  // TODO We need to update the schema and functions all the way down, to
  //   replace the old one with the new one; and that's out of scope at the
  //   moment.
  txnData: ModelSchema.Transaction[];
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
