/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import React from 'react';
import { formatAmount } from '../../client-lib';

interface Props {
  amountInCents: number;
}

export const DollarAmountRenderer: React.FC<Props> = (props) => {
  if (props.amountInCents === 0) {
    return null;
  }
  return <>{formatAmount(props.amountInCents)}</>;
};
