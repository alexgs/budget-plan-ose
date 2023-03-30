/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { formatAmount } from '../../../client-lib';
import { getFriendlyAccountName, sumSubrecords } from '../../../shared-lib';
import { Column } from '../Components/Column';
import { ExpandRowButton } from '../Components/ExpandRowButton';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

export const SplitCategoryRow: React.FC<RowProps> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function renderSubrecords() {
    if (isExpanded) {
      return (
        <Row>
          <Column>{/* Checkbox */}</Column>
          <Column>{/* Date */}</Column>
          <Column>{/* Account */}</Column>
          <Column>Hello hidden world</Column>
          <Column>{/* Category */}</Column>
          <Column>{/* Notes */}</Column>
          <Column>{/* Amount */}</Column>
          <Column>{/* Buttons */}</Column>
        </Row>
      );
    }
    return null;
  }

  return (
    <>
      <Row>
        <Column>
          <ExpandRowButton
            isExpanded={isExpanded}
            onClick={() => setExpanded((prevState) => !prevState)}
          />
        </Column>
        <Column>{/* Date */}</Column>
        <Column>
          {getFriendlyAccountName(
            props.accountData,
            props.txn.accounts[0].accountId
          )}
        </Column>
        <Column>{props.txn.description}</Column>
        <Column style={{ fontStyle: 'italic' }}>Split</Column>
        <Column>{/* Notes */}</Column>
        <Column>{formatAmount(sumSubrecords(props.txn.categories))}</Column>
        <Column>{/* Buttons */}</Column>
      </Row>
      {renderSubrecords()}
    </>
  );
};
