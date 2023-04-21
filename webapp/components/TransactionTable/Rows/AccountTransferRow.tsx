/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

import { getFriendlyAccountName, sumSubrecords } from '../../../shared-lib';
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

export const AccountTransferRow: React.FC<Props> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function handleEditClick() {
    props.onEditClick(props.txn.id);
  }

  function renderSubrecords() {
    if (isExpanded) {
      return props.txn.accounts.map((subrecord) => {
        return (
          <Row key={subrecord.id} style={{ borderTop: 'none' }}>
            <ChevronCell>{/* Checkbox */}</ChevronCell>
            <DateCell>{/* Date */}</DateCell>
            <AccountCell style={{ paddingLeft: 8 }}>
              {getFriendlyAccountName(props.accountData, subrecord.accountId)}
            </AccountCell>
            <DescriptionCell />
            <CategoryCell />
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
        <AccountCell style={{ fontStyle: 'italic' }}>Transfer</AccountCell>
        <DescriptionCell>{props.txn.description}</DescriptionCell>
        <CategoryCell>{/* Category */}</CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <SmartAmountCell amount={sumSubrecords(props.txn.accounts)} />
        <ButtonsCell>
          <UnstyledButton onClick={handleEditClick}>
            <FontAwesomeIcon icon={faPencil} />
          </UnstyledButton>
        </ButtonsCell>
      </Row>
      {renderSubrecords()}
    </>
  );
};
