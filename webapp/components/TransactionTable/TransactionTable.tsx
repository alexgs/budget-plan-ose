/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import React from 'react';

import { TransactionRow } from '../../client-lib/types';

interface Props {
  // data: TransactionRow[];
}

export const TransactionTable: React.FC<Props> = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <td /> {/* Checkbox, maybe other controls */}
          <td>Date</td>
          <td>Account</td>
          <td>Description</td>
          <td>Category</td>
          <td>Notes</td>
          <td>Amount</td>
          <td /> {/* Status icons (pending, cleared, etc.), maybe other controls */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td /> {/* Checkbox, maybe other controls */}
          <td>Date</td>
          <td>Account</td>
          <td>Nothing to see here</td>
          <td>Category</td>
          <td>Notes</td>
          <td>Amount</td>
          <td /> {/* Status icons (pending, cleared, etc.), maybe other controls */}
        </tr>
      </tbody>
    </Table>
  );
};
