/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';

// Using "!important" is not great, but I'm not sure how to make the CSS selectors more specific
export const BorderlessRow = styled.tr({
  td: {
    borderTop: 'none !important',
    paddingTop: '0 !important',
  },
});

