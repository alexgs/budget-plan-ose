/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import React from 'react';

import { TransactionRow } from '../../client-lib/types';

interface Props {
  data: TransactionRow[];
}

export const TransactionTable: React.FC<Props> = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <td>Nothing to see here</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nothing to see here</td>
        </tr>
      </tbody>
    </Table>
  );
};
