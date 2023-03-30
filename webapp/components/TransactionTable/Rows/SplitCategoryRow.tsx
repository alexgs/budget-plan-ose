/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { getFriendlyAccountName, sumSubrecords } from '../../../shared-lib';
import { Column } from '../Components/Column';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

export const SplitCategoryRow: React.FC<RowProps> = (props) => {
  return (
    <Row>
      <Column>{/* Checkbox */}</Column>
      <Column>
        {getFriendlyAccountName(
          props.accountData,
          props.txn.accounts[0].accountId
        )}
      </Column>
      <Column style={{ fontStyle: 'italic' }}>Split</Column>
      <Column>{/* Notes */}</Column>
      <Column>{formatAmount(sumSubrecords(props.txn.categories))}</Column>
      <Column>{/* Buttons */}</Column>
    </Row>
  );
};
