/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { CSSObject, MantineTheme } from '@mantine/core';

export const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});
