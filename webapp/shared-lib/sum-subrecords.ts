/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Subrecord } from './types';

/**
 * Takes a bunch of values from the form and returns their sum. The output is
 * negative for debits and positive for credits.
 */
export const sumSubrecords = (subrecords: Subrecord[]): number => {
  return subrecords.reduce((output, current) => {
    if (current.isCredit) {
      return output + current.amount;
    }
    return output - current.amount;
  }, 0);
};
