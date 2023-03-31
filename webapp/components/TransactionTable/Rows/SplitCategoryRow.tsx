/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { getFriendlyAccountName, sumSubrecords } from '../../../shared-lib';
import { AccountCell, ChevronCell } from '../Components/Cell';
import { Column } from '../Components/Column';
import { ExpandRowButton } from '../Components/ExpandRowButton';
import { Row } from '../Components/Row';
import { COLUMN_WIDTH } from './column-width';

import { RowProps } from './row-props';

export const SplitCategoryRow: React.FC<RowProps> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function renderSubrecords() {
    if (isExpanded) {
      return (
        <Row>
          <ChevronCell>{/* Checkbox */}</ChevronCell>
          <Column width={COLUMN_WIDTH.DATE}>{/* Date */}</Column>
          <AccountCell>{/* Account */}</AccountCell>
          <Column
            style={{
              paddingLeft: 8,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            width={COLUMN_WIDTH.DESCRIPTION}
          >
            Hello hidden world
          </Column>
          <Column width={COLUMN_WIDTH.CATEGORY}>{/* Category */}</Column>
          <Column width={COLUMN_WIDTH.NOTES}>{/* Notes */}</Column>
          <Column width={COLUMN_WIDTH.AMOUNT}>{/* Amount */}</Column>
          <Column width={COLUMN_WIDTH.BUTTONS}>{/* Buttons */}</Column>
        </Row>
      );
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
        <Column width={COLUMN_WIDTH.DATE}>{/* Date */}</Column>
        <AccountCell>
          {getFriendlyAccountName(
            props.accountData,
            props.txn.accounts[0].accountId
          )}
        </AccountCell>
        <Column width={COLUMN_WIDTH.DESCRIPTION}>
          {props.txn.description}
        </Column>
        <Column style={{ fontStyle: 'italic' }} width={COLUMN_WIDTH.CATEGORY}>
          Split
        </Column>
        <Column width={COLUMN_WIDTH.NOTES}>{/* Notes */}</Column>
        <Column width={COLUMN_WIDTH.AMOUNT}>
          {formatAmount(sumSubrecords(props.txn.categories))}
        </Column>
        <Column width={COLUMN_WIDTH.BUTTONS}>{/* Buttons */}</Column>
      </Row>
      {renderSubrecords()}
    </>
  );
};
