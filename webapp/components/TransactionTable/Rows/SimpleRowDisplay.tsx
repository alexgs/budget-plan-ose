/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

import {
  getFriendlyAccountName,
  getFriendlyCategoryName
} from '../../../shared-lib';
import {
  AccountCell, ButtonsCell, CategoryCell,
  ChevronCell,
  DateCell,
  DescriptionCell, NotesCell
} from '../Components/Cell';
import { Row } from '../Components/Row';
import { SmartAmountCell } from '../Components/SmartAmountCell';

import { RowProps } from './row-props';

interface Props extends RowProps {
  onEditClick: (txnId: string) => void;
}

export const SimpleRowDisplay: React.FC<Props> = (props) => {
  function handleEditClick() {
    props.onEditClick(props.txn.id);
  }

  return (
    <Row key={props.txn.id}>
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
          props.txn.categories[0].categoryId
        )}
      </CategoryCell>
      <NotesCell>{/* Notes */}</NotesCell>
      <SmartAmountCell subrecord={props.txn.categories[0]} />
      <ButtonsCell>
        <UnstyledButton onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPencil} />
        </UnstyledButton>
      </ButtonsCell>
    </Row>
  );
}
