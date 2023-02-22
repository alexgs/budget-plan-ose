/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { formatAmount } from '../../../client-lib';
import {
  Account,
  ApiSchema,
  Category,
  getFriendlyAccountName,
  getFriendlyCategoryName,
} from '../../../shared-lib';
import { ExpandRowButton } from '../BuildingBlocks';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txn: ApiSchema.Transaction;
}

// TODO Rotate chevron when expanded
// TODO Add animation to expanding and collapsing rows

export const SplitCategoryRow: React.FC<Props> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(true);

  function renderSubrecords() {
    if (isExpanded) {
      return props.txn.categories.map((subrecord) => (
        <tr>
          <td />{/* Checkbox, maybe other controls */}
          <td />{/* Date */}
          <td />{/* Account name */}
          <td />{/* Description */}
          <td>
            {getFriendlyCategoryName(props.categoryData, subrecord.categoryId)}
          </td>
          <td />{/* Notes */}
          <td>{formatAmount(subrecord.amount)}</td>
          <td />{/* Status icons (pending, cleared, etc.), maybe other controls */}
        </tr>
      ));
    }
    return null;
  }

  return (
    <>
      <tr>
        <td>
          {/* Checkbox, maybe other controls */}
          <ExpandRowButton
            isExpanded={isExpanded}
            onClick={() => setExpanded((prevState) => !prevState)}
          />
        </td>
        <td>{props.txn.date}</td>
        <td>
          {getFriendlyAccountName(
            props.accountData,
            props.txn.accounts[0].accountId
          )}
        </td>
        <td>{props.txn.description}</td>
        <td style={{ fontStyle: 'italic' }}>Split</td>
        <td />{/* Notes */}
        <td style={{ fontStyle: 'italic' }}>Split</td>
        <td />{/* Status icons (pending, cleared, etc.), maybe other controls */}
      </tr>
      {renderSubrecords()}
    </>
  );
};
