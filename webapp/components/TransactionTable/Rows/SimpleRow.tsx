/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import {
  getFriendlyAccountName,
  getFriendlyCategoryName,
} from '../../../shared-lib';
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

export const SimpleRow: React.FC<RowProps> = (props) => {
  const amount = props.txn.categories[0].isCredit
    ? props.txn.categories[0].amount
    : -1 * props.txn.categories[0].amount;
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
      <AmountCell>{formatAmount(amount)}</AmountCell>
      <ButtonsCell>{/* Buttons */}</ButtonsCell>
    </Row>
  );
};
