/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

function padTwoDigits(x: number): string {
  return x.toString(10).padStart(2, '0');
}

export function formatUtcDate(date: Date): string {
  // Get date in the local timezone
  return [
    date.getFullYear(),
    padTwoDigits(date.getMonth() + 1),
    padTwoDigits(date.getDate()),
  ].join('-');
}
