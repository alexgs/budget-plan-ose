/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import {
  ApiSchema,
  getFriendlyAccountName,
  getFriendlyCategoryName
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

interface Props extends Omit<RowProps, 'txn'> {
  data?: ApiSchema.UpdateTransaction;
}

export const SimpleRowForm: React.FC<Props> = (props) => {
  const key = props.data ? props.data.id : 'new-txn';
  return (
    <Row key={key}>
      <ChevronCell>{/* Checkbox */}</ChevronCell>
      <DateCell>{props.data?.date.toISOString()}</DateCell>
      <AccountCell>
        {getFriendlyAccountName(
          props.accountData,
          props.data.accounts[0].accountId
        )}
      </AccountCell>
      <DescriptionCell>{props.data.description}</DescriptionCell>
      <CategoryCell>
        {getFriendlyCategoryName(
          props.categoryData,
          props.data.categories[0].categoryId
        )}
      </CategoryCell>
      <NotesCell>{/* Notes */}</NotesCell>
      <SmartAmountCell subrecord={props.data.categories[0]} />
      <ButtonsCell>{/* Buttons */}</ButtonsCell>
    </Row>
  );
};
