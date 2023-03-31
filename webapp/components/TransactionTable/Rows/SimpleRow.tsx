/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import {
  getFriendlyAccountName,
  getFriendlyCategoryName,
} from '../../../shared-lib';
import {
  AccountCell,
  ButtonsCell,
  CategoryCell,
  ChevronCell,
  DateCell,
  DescriptionCell,
  NotesCell,
} from '../Components/Cell';
import { Row } from '../Components/Row';
import { SmartAmountCell } from '../Components/SmartAmountCell';

import { RowProps } from './row-props';

export const SimpleRow: React.FC<RowProps> = (props) => {
  return (
    <Row key={props.txn.id}>
      <ChevronCell>{/* Checkbox */}</ChevronCell>
      <DateCell>{/* Date */}</DateCell>
      <AccountCell>
        {getFriendlyAccountName(
          props.accountData,
          props.txn.accounts[0].accountId
        )}
      </AccountCell>
      <DescriptionCell>{props.txn.description}</DescriptionCell>
      <CategoryCell>
        {getFriendlyCategoryName(
          props.categoryData,
          props.txn.categories[0].categoryId
        )}
      </CategoryCell>
      <NotesCell>{/* Notes */}</NotesCell>
      <SmartAmountCell subrecord={props.txn.categories[0]} />
      <ButtonsCell>{/* Buttons */}</ButtonsCell>
    </Row>
  );
};
