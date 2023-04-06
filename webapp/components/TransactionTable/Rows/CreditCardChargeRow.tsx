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

export const CreditCardChargeRow: React.FC<RowProps> = (props) => {
  function getUserCategorySubrecord() {
    const subrecordCategoryIds = props.txn.categories.map(
      (subrecord) => subrecord.categoryId
    );
    const catData = props.categoryData.filter((cat) =>
      subrecordCategoryIds.includes(cat.id)
    );
    if (catData.length !== 2) {
      throw new Error('Something went wrong (part 1)');
    }
    // Get the ID of the user (i.e. non-system) category
    const userCatId = catData[0].isSystem ? catData[1].id : catData[0].id;
    return props.txn.categories[0].categoryId === userCatId
      ? props.txn.categories[0]
      : props.txn.categories[1];
  }

  const categorySubrecord = getUserCategorySubrecord();
  return (
    <Row>
      <ChevronCell>{/* Checkbox */}</ChevronCell>
      <DateCell>{props.txn.date.substring(5)}</DateCell>
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
          categorySubrecord.categoryId
        )}
      </CategoryCell>
      <NotesCell>{/* Notes */}</NotesCell>
      <SmartAmountCell subrecord={categorySubrecord} />
      <ButtonsCell>{/* Buttons */}</ButtonsCell>
    </Row>
  );
};
