/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
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

interface Props extends RowProps {
  onEditClick: (txnId: string) => void;
}

export const CreditCardChargeRow: React.FC<Props> = (props) => {
  function getUserCategorySubrecord() {
    const subrecordCategoryIds = props.txn.categories.map(
      (subrecord) => subrecord.categoryId
    );
    const catData = props.categoryData.filter((cat) =>
      subrecordCategoryIds.includes(cat.id)
    );
    if (catData.length < 2) {
      throw new Error('Something went wrong (part 1)');
    }
    // Get the ID of the user (i.e. non-system) category
    const userCatId = catData[0].isSystem ? catData[1].id : catData[0].id;
    return props.txn.categories[0].categoryId === userCatId
      ? props.txn.categories[0]
      : props.txn.categories[1];
  }

  function handleEditClick() {
    props.onEditClick(props.txn.id);
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
      <ButtonsCell>
        <UnstyledButton onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPencil} />
        </UnstyledButton>
      </ButtonsCell>
    </Row>
  );
};
