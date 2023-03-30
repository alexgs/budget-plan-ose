/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Text } from '@mantine/core';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatAmount(cents?: number | null) {
  // If amount is undefined or null (but not zero), return null
  if (cents == null) {
    return null;
  }

  const formattedAmount = formatter.format(cents / 100);
  if (cents < 0) {
    return <Text span color="red">{formattedAmount}</Text>;
  }

  return <Text span>{formattedAmount}</Text>;
}
