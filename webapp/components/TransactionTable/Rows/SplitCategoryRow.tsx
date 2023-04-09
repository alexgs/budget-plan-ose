/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

import {
  TRANSACTION_TYPES,
  getFriendlyAccountName,
  getFriendlyCategoryName,
  sumSubrecords,
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
import { ExpandRowButton } from '../Components/ExpandRowButton';
import { Row } from '../Components/Row';
import { SmartAmountCell } from '../Components/SmartAmountCell';

import { RowProps } from './row-props';

interface Props extends RowProps {
  onEditClick: (txnId: string) => void;
}

// TODO Add animation to expanding and collapsing rows

export const SplitCategoryRow: React.FC<Props> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function handleEditClick() {
    props.onEditClick(props.txn.id);
  }

  function renderButtonsCell() {
    if (props.txn.type === TRANSACTION_TYPES.DEPOSIT) {
      return (
        <ButtonsCell>
          <UnstyledButton onClick={handleEditClick}>
            <FontAwesomeIcon icon={faPencil} />
          </UnstyledButton>
        </ButtonsCell>
      );
    }
    return <ButtonsCell>{/* Buttons */}</ButtonsCell>;
  }

  function renderSubrecords() {
    if (isExpanded) {
      return props.txn.categories.map((subrecord) => {
        return (
          <Row key={subrecord.id} style={{ borderTop: 'none' }}>
            <ChevronCell>{/* Checkbox */}</ChevronCell>
            <DateCell>{/* Date */}</DateCell>
            <AccountCell>{/* Account */}</AccountCell>
            <DescriptionCell />
            <CategoryCell style={{ paddingLeft: 8 }}>
              {getFriendlyCategoryName(
                props.categoryData,
                subrecord.categoryId
              )}
            </CategoryCell>
            <NotesCell>{/* Notes */}</NotesCell>
            <SmartAmountCell style={{ paddingLeft: 8 }} subrecord={subrecord} />
            <ButtonsCell>{/* Buttons */}</ButtonsCell>
          </Row>
        );
      });
    }
    return null;
  }

  return (
    <>
      <Row>
        <ChevronCell>
          <ExpandRowButton
            isExpanded={isExpanded}
            onClick={() => setExpanded((prevState) => !prevState)}
          />
        </ChevronCell>
        <DateCell>{props.txn.date.substring(5)}</DateCell>
        <AccountCell>
          {getFriendlyAccountName(
            props.accountData,
            props.txn.accounts[0].accountId
          )}
        </AccountCell>
        <DescriptionCell>{props.txn.description}</DescriptionCell>
        <CategoryCell style={{ fontStyle: 'italic' }}>Split</CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <SmartAmountCell amount={sumSubrecords(props.txn.categories)} />
        {renderButtonsCell()}
      </Row>
      {renderSubrecords()}
    </>
  );
};
