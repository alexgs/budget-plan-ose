/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';

interface Props {
  border?: boolean;
}

export const Row = styled.div((props: Props) => ({
  alignItems: 'center',
  borderTop: props.border === false ? 'none' : '1px solid #373A40',
  display: 'flex',
}));
