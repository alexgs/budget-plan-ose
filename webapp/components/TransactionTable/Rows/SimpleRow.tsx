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
