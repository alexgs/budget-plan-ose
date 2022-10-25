/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

export function formatClientDate(date: Date): string {
  return [
    date.getUTCFullYear(),
    padTwoDigits(date.getMonth() + 1),
    padTwoDigits(date.getDate()),
  ].join('-');
}

function padTwoDigits(x: number): string {
  return x.toString(10).padStart(2, '0');
}

