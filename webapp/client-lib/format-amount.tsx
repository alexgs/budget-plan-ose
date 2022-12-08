/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Text } from '@mantine/core';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatAmount(amount?: number | null) {
  // If amount is undefined or null (but not zero), return null
  if (amount == null) {
    return null;
  }

  const formattedAmount = formatter.format(amount / 100);
  if (amount < 0) {
    return <Text color="red">{formattedAmount}</Text>;
  }

  return <Text>{formattedAmount}</Text>;
}
