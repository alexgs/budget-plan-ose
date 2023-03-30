/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import React from 'react';
import { formatAmount } from '../../../client-lib';

import {
  Account,
  ApiSchema,
  Category,
  getFriendlyAccountName,
  getFriendlyCategoryName,
} from '../../../shared-lib';
import { Column } from '../Components/Column';
import { Row } from '../Components/Row';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txn: ApiSchema.Transaction;
}

export const SimpleRow: React.FC<Props> = (props) => {
  return (
    <Row key={props.txn.id}>
      <Column>{/* Checkbox */}</Column>
      <Column>
        {getFriendlyAccountName(
          props.accountData,
          props.txn.accounts[0].accountId
        )}
      </Column>
      <Column>
        {getFriendlyCategoryName(
          props.categoryData,
          props.txn.categories[0].categoryId
        )}
      </Column>
      <Column>{/* Notes */}</Column>
      <Column>{formatAmount(props.txn.categories[0].amount)}</Column>
      <Column>{/* Buttons */}</Column>
    </Row>
  );
};
