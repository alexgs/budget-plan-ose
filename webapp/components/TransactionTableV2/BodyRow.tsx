/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { flexRender } from '@tanstack/react-table';
import { Row } from '@tanstack/table-core';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';
import { BodyCell } from './BodyCell';

interface Props {
  row:  Row<TransactionRow>
}

export const BodyRow: React.FC<Props> = (props) => {
  // TODO Set `padding: 0` on the chevron cell
  return (
    <tr key={props.row.id}>
      {props.row.getVisibleCells().map((cell) => (
        <BodyCell
          key={cell.id}
          style={{
            maxWidth: cell.column.getSize(),
            width: cell.column.getSize(),
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </BodyCell>
      ))}
    </tr>
  )
}
