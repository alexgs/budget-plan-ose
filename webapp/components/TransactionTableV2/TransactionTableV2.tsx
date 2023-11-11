/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Table } from '@mantine/core';
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { BodyCell } from './BodyCell';
import { fuzzyFilter } from './fuzzy-filter';
import { getColumnDefs } from './get-column-defs';
import { HeaderCell, Resizer } from './HeaderCell';

interface Props {
  accounts?: ModelSchema.Account[];
  data: TransactionRow[];
  filter?: string;
}

const columns = getColumnDefs();

export const TransactionTableV2: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    columns,
    columnResizeMode: 'onChange',
    data: props.data,
    debugTable: false,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subrecords,
    globalFilterFn: fuzzyFilter,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: (value) =>
      console.log('>> Global filter change:', value, '<<'),
    state: {
      expanded,
      globalFilter: props.filter,
    },
  });

  return (
    <Table style={{ width: table.getCenterTotalSize() }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <HeaderCell
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getCanResize() ? (
                  <Resizer
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={
                      header.column.getIsResizing() ? 'isResizing' : ''
                    }
                  />
                ) : null}
              </HeaderCell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <BodyCell key={cell.id} style={{ maxWidth: cell.column.getSize(), width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </BodyCell>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
