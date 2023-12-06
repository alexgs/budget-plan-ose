/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

function padTwoDigits(x: number): string {
  return x.toString(10).padStart(2, '0');
}

/**
 * Gets the UTC date in YYYY-MM-DD format from a given Date object.
 */
export function formatUtcDate(date: Date): string {
  return [
    date.getUTCFullYear(),
    padTwoDigits(date.getUTCMonth() + 1),
    padTwoDigits(date.getUTCDate()),
  ].join('-');
}
