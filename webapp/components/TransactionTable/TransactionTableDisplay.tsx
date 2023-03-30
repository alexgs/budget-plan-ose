/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import React from 'react';

import {
  TRANSACTION_TYPES,
  Account,
  ApiSchema,
  Category,
} from '../../shared-lib';

import { SimpleRow } from './Rows/SimpleRow';

const Table = styled.div({});

interface Props {
  accountData: Account[];
  accountId?: string;
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTableDisplay: React.FC<Props> = (props) => {
  function renderRows() {
    return props.txnData.map((txn) => {
      if (txn.accounts.length === 1 && txn.categories.length > 1) {
        return <div key={txn.id}>Split category row</div>
      }

      if (txn.accounts.length > 1 && txn.categories.length === 1) {
        return <div key={txn.id}>Split account row</div>
      }

      if (txn.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
        return <div key={txn.id}>Account transfer row</div>
      }

      if (txn.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
        return <div key={txn.id}>Category transfer row</div>
      }

      // Default option
      return (
        <SimpleRow
          key={txn.id}
          accountData={props.accountData}
          categoryData={props.categoryData}
          txn={txn}
        />
      );
    });
  }

  return <Table>{renderRows()}</Table>;
};
