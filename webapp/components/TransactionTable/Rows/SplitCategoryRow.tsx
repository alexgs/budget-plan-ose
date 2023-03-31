/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import {
  getFriendlyAccountName,
  getFriendlyCategoryName,
  sumSubrecords,
} from '../../../shared-lib';
import { SmartAmountCell as AmountCell } from '../Components/SmartAmountCell';
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

export const SplitCategoryRow: React.FC<RowProps> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

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
            <AmountCell style={{ paddingLeft: 8 }} subrecord={subrecord} />
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
        <AccountCell>
          {getFriendlyAccountName(
            props.accountData,
            props.txn.accounts[0].accountId
          )}
        </AccountCell>
        <DescriptionCell>{props.txn.description}</DescriptionCell>
        <CategoryCell style={{ fontStyle: 'italic' }}>Split</CategoryCell>
        <NotesCell>{/* Notes */}</NotesCell>
        <AmountCell amount={sumSubrecords(props.txn.categories)} />
        <ButtonsCell>{/* Buttons */}</ButtonsCell>
      </Row>
      {renderSubrecords()}
    </>
  );
};
