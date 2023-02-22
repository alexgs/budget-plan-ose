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

interface Props {
  accountData: Account[];
  categoryData: Category[];
  txn: ApiSchema.Transaction;
}

export const SplitCategoryRow: React.FC<Props> = (props) => {
  return (
    <>
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
        <td />{/* Status icons (pending, cleared, etc.), maybe other controls */}
      </tr>
      <tr>
        <td />{/* Checkbox, maybe other controls */}
        <td />{/* Date */}
        <td />{/* Account name */}
        <td />{/* Description */}
        <td>
          {getFriendlyCategoryName(
            props.categoryData,
            props.txn.categories[1].categoryId
          )}
        </td>
        <td />{/* Notes */}
        <td>{formatAmount(props.txn.categories[1].amount)}</td>
        <td />{/* Status icons (pending, cleared, etc.), maybe other controls */}
      </tr>
    </>
  );
};
