/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { sumSubrecords } from '../../../shared-lib';
import {
  AccountCell,
  AmountCell,
  ButtonsCell,
  CategoryCell,
  ChevronCell,
  DateCell,
  DescriptionCell,
  NotesCell,
} from '../Components/Cell';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

export const AccountTransferRow: React.FC<RowProps> = (props) => {
  return (
    <Row>
      <ChevronCell>{/* Checkbox */}</ChevronCell>
      <DateCell>{/* Date */}</DateCell>
      <AccountCell style={{ fontStyle: 'italic' }}>Transfer</AccountCell>
      <DescriptionCell>{props.txn.description}</DescriptionCell>
      <CategoryCell>{/* Category */}</CategoryCell>
      <NotesCell>{/* Notes */}</NotesCell>
      <AmountCell>{formatAmount(sumSubrecords(props.txn.accounts))}</AmountCell>
      <ButtonsCell>{/* Buttons */}</ButtonsCell>
    </Row>
  );
};
