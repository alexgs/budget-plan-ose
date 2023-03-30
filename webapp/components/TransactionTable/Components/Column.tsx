/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';

interface Props {
  width?: string | number;
}

export const Column = styled.div((props: Props) => ({
  // display: 'table-cell',
  width: props.width ? props.width : undefined,
}));
