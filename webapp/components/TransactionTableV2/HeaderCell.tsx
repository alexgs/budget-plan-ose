/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';

export const HeaderCell = styled.th({
  position: 'relative',
});

export const Resizer = styled.div({
  background: 'rgba(255, 255, 255, 0.15)',
  cursor: 'col-resize',
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  touchAction: 'none',
  userSelect: 'none',
  width: 5,

  '.isResizing': {
    background: 'blue',
    opacity: 1,
  },
});

