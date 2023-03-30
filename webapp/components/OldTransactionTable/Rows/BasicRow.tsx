/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

import { formatAmount } from '../../../client-lib';
import {
  Account,
  ApiSchema,
  Category,
  getFriendlyAccountName,
  getFriendlyCategoryName,
} from '../../../shared-lib';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  onEditClick: (recordId: string) => void;
  txn: ApiSchema.Transaction;
}

export const BasicRow: React.FC<Props> = (props) => {
  function handleEditClick() {
    props.onEditClick(props.txn.id);
  }

  return (
    <tr>
      <td />{/* Checkbox, maybe other controls */}
      <td>{props.txn.date}</td>
      <td>
        {getFriendlyAccountName(
          props.accountData,
          props.txn.accounts[0].accountId
        )}
      </td>
      <td>{props.txn.description}</td>
      <td>
        {getFriendlyCategoryName(
          props.categoryData,
          props.txn.categories[0].categoryId
        )}
      </td>
      <td />{/* Notes */}
      <td>{formatAmount(props.txn.categories[0].amount)}</td>
      <td>
        <UnstyledButton onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPencil} />
        </UnstyledButton>
      </td>
    </tr>
  );
};
