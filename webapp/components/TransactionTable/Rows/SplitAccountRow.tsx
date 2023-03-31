/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import {
  getFriendlyAccountName,
  getFriendlyCategoryName,
  sumSubrecords,
} from '../../../shared-lib';
import { SmartAmountCell } from '../Components/SmartAmountCell';
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

import { RowProps } from './row-props';

// TODO Add animation to expanding and collapsing rows

export const SplitAccountRow: React.FC<RowProps> = (props) => {
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
        <DateCell>{/* Date */}</DateCell>
        <AccountCell style={{ fontStyle: 'italic' }}>Split</AccountCell>
        <DescriptionCell>{props.txn.description}</DescriptionCell>
        <CategoryCell>
          {getFriendlyCategoryName(
            props.categoryData,
            props.txn.categories[0].categoryId
          )}
        </CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <SmartAmountCell amount={sumSubrecords(props.txn.categories)} />
        <ButtonsCell>{/* Buttons */}</ButtonsCell>
      </Row>
      {renderSubrecords()}
    </>
  );
};
