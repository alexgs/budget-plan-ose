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

// TODO Add animation to expanding and collapsing rows

export const SplitAccountRow: React.FC<Props> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function renderSubrecords() {
    if (isExpanded) {
      return props.txn.accounts.map((subrecord) => (
        <tr>
          <td />{/* Checkbox, maybe other controls */}
          <td />{/* Date */}
          <td>
            {/* Account name */}
            {getFriendlyAccountName(props.accountData, subrecord.accountId)}
          </td>
          <td />{/* Description */}
          <td />{/* Category */}
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
        <td style={{ fontStyle: 'italic' }}>Split</td>
        <td>{props.txn.description}</td>
        <td>
          {getFriendlyCategoryName(
            props.categoryData,
            props.txn.categories[0].categoryId
          )}
        </td>
        <td />{/* Notes */}
        <td style={{ fontStyle: 'italic' }}>Split</td>
        <td />{/* Status icons (pending, cleared, etc.), maybe other controls */}
      </tr>
      {renderSubrecords()}
    </>
  );
};
