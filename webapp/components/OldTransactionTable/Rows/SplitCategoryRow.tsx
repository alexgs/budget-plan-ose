/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

import { formatAmount } from '../../../client-lib';
import {
  TRANSACTION_TYPES,
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
  onEditClick?: (recordId: string) => void;
  txn: ApiSchema.Transaction;
}

// TODO Add animation to expanding and collapsing rows

export const SplitCategoryRow: React.FC<Props> = (props) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);

  function handleEditClick() {
    if (props.onEditClick) {
      props.onEditClick(props.txn.id);
    }
  }

  function renderEditButton() {
    if (props.txn.type === TRANSACTION_TYPES.DEPOSIT) {
      return (
        <UnstyledButton onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPencil} />
        </UnstyledButton>
      );
    }
    return null;
  }

  function renderSubrecords() {
    if (isExpanded) {
      return props.txn.categories.map((subrecord) => (
        <tr key={subrecord.id}>
          <td>{/* Checkbox, maybe other controls */}</td>
          <td>{/* Date */}</td>
          <td>{/* Account name */}</td>
          <td>{/* Description */}</td>
          <td>
            {getFriendlyCategoryName(props.categoryData, subrecord.categoryId)}
          </td>
          <td>{/* Notes */}</td>
          <td>{formatAmount(subrecord.amount)}</td>
          <td>
            {/* Status icons (pending, cleared, etc.), maybe other controls */}
          </td>
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
        <td>{/* Notes */}</td>
        <td style={{ fontStyle: 'italic' }}>Split</td>
        <td>{renderEditButton()}</td>
      </tr>
      {renderSubrecords()}
    </>
  );
};
