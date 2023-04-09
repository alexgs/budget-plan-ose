/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatAmount(cents?: number | null): string | null {
  // If amount is undefined or null (but not zero), return null
  if (cents == null) {
    return null;
  }

  return formatter.format(cents / 100);
}
