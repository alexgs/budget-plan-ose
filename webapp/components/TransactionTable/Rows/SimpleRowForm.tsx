/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { ApiSchema } from '../../../shared-lib';
import { Row } from '../Components/Row';

import { RowProps } from './row-props';

interface Props extends Omit<RowProps, 'txn'> {
  data?: ApiSchema.UpdateTransaction;
}

export const SimpleRowForm: React.FC<Props> = (props) => {
  const key = props.data ? props.data.id : 'new-txn';
  return (
    <Row key={key}>
      <div>Hello simple row form</div>
    </Row>
  );
}
