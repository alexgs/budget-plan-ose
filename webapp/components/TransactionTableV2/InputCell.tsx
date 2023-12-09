/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';

// Using "!important" is not great, but I'm not sure how to make the CSS selectors more specific
export const InputCell = styled.td({
  paddingLeft: '0 !important',
  paddingRight: '5px !important',

  '& input, & select': {
    paddingLeft: 6,
  },
});
