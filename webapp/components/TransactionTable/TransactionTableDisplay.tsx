/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import React from 'react';

import { Account, ApiSchema, Category } from '../../shared-lib';

const Column = styled.div({});

const Row = styled.div({});

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
      return (
        <Row key={txn.id}>
          <Column>{txn.id}</Column>
        </Row>
      );
    });
  }

  return <Table>{renderRows()}</Table>;
};
