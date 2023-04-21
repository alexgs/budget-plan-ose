/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Text } from '@mantine/core';
import React from 'react';

import { formatAmount } from '../../../client-lib';
import { formatSubrecordAmount } from '../../../client-lib/format-subrecord-amount';
import { Subrecord } from '../../../shared-lib';

import { AmountCell } from './Cell';

function renderAmount(amount: String | null): React.ReactElement {
  if (!amount) {
    return <Text span>$0.00</Text>;
  }
  if (amount === '$0.00') {
    return <Text span>{amount}</Text>;
  }
  if (amount.startsWith('-')) {
    return <Text span>{amount.substring(1)}</Text>;
  }
  return (
    <Text span color="green">
      {amount}
    </Text>
  );
}

interface AmountProps {
  amount: number;
  style?: React.CSSProperties;
}

interface SubrecordProps {
  style?: React.CSSProperties;
  subrecord: Subrecord;
}

type Props = AmountProps | SubrecordProps;

export const SmartAmountCell: React.FC<Props> = (props) => {
  if ('subrecord' in props) {
    return (
      <AmountCell style={props.style}>
        {renderAmount(formatSubrecordAmount(props.subrecord))}
      </AmountCell>
    );
  }

  if ('amount' in props) {
    return (
      <AmountCell style={props.style}>
        {renderAmount(formatAmount(props.amount))}
      </AmountCell>
    );
  }
  throw new Error('Must include either `amount` or `subrecord`');
};
