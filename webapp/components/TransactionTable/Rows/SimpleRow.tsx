/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { formatAmount } from '../../../client-lib';

import {
  getFriendlyAccountName,
  getFriendlyCategoryName,
} from '../../../shared-lib';
import { Column } from '../Components/Column';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

export const SimpleRow: React.FC<RowProps> = (props) => {
  const amount = props.txn.categories[0].isCredit ? props.txn.categories[0].amount : -1 * props.txn.categories[0].amount;
  return (
    <Row key={props.txn.id}>
      <Column>{/* Checkbox */}</Column>
      <Column>{/* Date */}</Column>
      <Column>
        {getFriendlyAccountName(
          props.accountData,
          props.txn.accounts[0].accountId
        )}
      </Column>
      <Column>{props.txn.description}</Column>
      <Column>
        {getFriendlyCategoryName(
          props.categoryData,
          props.txn.categories[0].categoryId
        )}
      </Column>
      <Column>{/* Notes */}</Column>
      <Column>{formatAmount(amount)}</Column>
      <Column>{/* Buttons */}</Column>
    </Row>
  );
};
