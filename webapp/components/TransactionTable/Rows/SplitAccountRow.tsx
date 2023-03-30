/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { getFriendlyCategoryName, sumSubrecords } from '../../../shared-lib';
import { Column } from '../Components/Column';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

export const SplitAccountRow: React.FC<RowProps> = (props) => {
  return (
    <Row>
      <Column>{/* Checkbox */}</Column>
      <Column style={{ fontStyle: 'italic' }}>Split</Column>
      <Column>{props.txn.description}</Column>
      <Column>
        {getFriendlyCategoryName(
          props.categoryData,
          props.txn.categories[0].categoryId
        )}
      </Column>
      <Column>{/* Notes */}</Column>
      <Column>{formatAmount(sumSubrecords(props.txn.accounts))}</Column>
      <Column>{/* Buttons */}</Column>
    </Row>
  );
};
