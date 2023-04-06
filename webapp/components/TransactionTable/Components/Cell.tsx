/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';

const COLUMN_WIDTH = {
  CHEVRON: 18,
  DATE: '12%',
  ACCOUNT: '18%',
  DESCRIPTION: '30%',
  CATEGORY: '23%',
  NOTES: 0,
  AMOUNT: '15%',
  BUTTONS: '10%'
} as const;

export const Cell = styled.div({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export const AccountCell = styled(Cell)({
  minWidth: 100,
  width: COLUMN_WIDTH.ACCOUNT,
});

export const AmountCell = styled(Cell)({
  width: COLUMN_WIDTH.AMOUNT,
});

export const ButtonsCell = styled(Cell)({
  width: COLUMN_WIDTH.BUTTONS,
});

export const CategoryCell = styled(Cell)({
  width: COLUMN_WIDTH.CATEGORY,
});

export const ChevronCell = styled(Cell)({
  width: COLUMN_WIDTH.CHEVRON,
});

export const DateCell = styled(Cell)({
  width: COLUMN_WIDTH.DATE,
});

export const DescriptionCell = styled(Cell)({
  width: COLUMN_WIDTH.DESCRIPTION,
});

export const NotesCell = styled(Cell)({
  width: COLUMN_WIDTH.NOTES,
});
