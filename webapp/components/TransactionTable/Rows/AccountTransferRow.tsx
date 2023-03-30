/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { sumSubrecords } from '../../../shared-lib';
import { Column } from '../Components/Column';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

export const AccountTransferRow: React.FC<RowProps> = (props) => {
  return (
    <Row>
      <Column>{/* Checkbox */}</Column>
      <Column style={{ fontStyle: 'italic' }}>Transfer</Column>
      <Column style={{ fontStyle: 'italic' }}>Transfer</Column>
      <Column>{/* Notes */}</Column>
      <Column>{formatAmount(sumSubrecords(props.txn.accounts))}</Column>
      <Column>{/* Buttons */}</Column>
    </Row>
  );
};
