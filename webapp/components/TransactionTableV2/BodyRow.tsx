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
  row: Row<TransactionRow>;
}

export const BodyRow: React.FC<Props> = (props) => {
  const visibleCells = props.row.getVisibleCells();
  return (
    <tr key={props.row.id}>
      {visibleCells.map((cell, index) => {
        if (index === 0 || index === visibleCells.length - 1) {
          return (
            <BodyCell
              key={cell.id}
              style={{
                padding: 0,
                maxWidth: cell.column.getSize(),
                width: cell.column.getSize(),
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </BodyCell>
          );
        }
        return (
          <BodyCell
            key={cell.id}
            style={{
              maxWidth: cell.column.getSize(),
              width: cell.column.getSize(),
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </BodyCell>
        );
      })}
    </tr>
  );
};
