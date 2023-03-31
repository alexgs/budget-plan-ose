/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { COLUMN_WIDTH } from '../Rows/column-width';

export const Cell = styled.div({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export const AccountCell = styled(Cell)({
  width: COLUMN_WIDTH.ACCOUNT,
});

export const ChevronCell = styled(Cell)({
  width: COLUMN_WIDTH.CHEVRON,
});
