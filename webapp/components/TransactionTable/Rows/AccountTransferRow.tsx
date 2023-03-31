/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { getFriendlyAccountName, sumSubrecords } from '../../../shared-lib';
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
import { ExpandRowButton } from '../Components/ExpandRowButton';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

// TODO Add animation to expanding and collapsing rows

export const AccountTransferRow: React.FC<RowProps> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

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
            <AmountCell style={{ paddingLeft: 8 }}>
              {formatAmount(subrecord.amount)}
            </AmountCell>
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
        <DateCell>{/* Date */}</DateCell>
        <AccountCell style={{ fontStyle: 'italic' }}>Transfer</AccountCell>
        <DescriptionCell>{props.txn.description}</DescriptionCell>
        <CategoryCell>{/* Category */}</CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <AmountCell>
          {formatAmount(sumSubrecords(props.txn.accounts))}
        </AmountCell>
        <ButtonsCell>{/* Buttons */}</ButtonsCell>
      </Row>
      {renderSubrecords()}
    </>
  );
};
