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

export const SplitCategoryRow: React.FC<RowProps> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function renderSubrecords() {
    if (isExpanded) {
      return (
        <Row style={{ borderTop: 'none'}}>
          <ChevronCell>{/* Checkbox */}</ChevronCell>
          <DateCell>{/* Date */}</DateCell>
          <AccountCell>{/* Account */}</AccountCell>
          <DescriptionCell style={{ paddingLeft: 8 }}>
            Hello hidden world
          </DescriptionCell>
          <CategoryCell>{/* Category */}</CategoryCell>
          <NotesCell>{/* Notes */}</NotesCell>
          <AmountCell>{/* Amount */}</AmountCell>
          <ButtonsCell>{/* Buttons */}</ButtonsCell>
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
        <DateCell>{/* Date */}</DateCell>
        <AccountCell>
          {getFriendlyAccountName(
            props.accountData,
            props.txn.accounts[0].accountId
          )}
        </AccountCell>
        <DescriptionCell>{props.txn.description}</DescriptionCell>
        <CategoryCell style={{ fontStyle: 'italic' }}>Split</CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <AmountCell>
          {formatAmount(sumSubrecords(props.txn.categories))}
        </AmountCell>
        <ButtonsCell>{/* Buttons */}</ButtonsCell>
      </Row>
      {renderSubrecords()}
    </>
  );
};
