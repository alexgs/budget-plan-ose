/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { Row } from '../Components/Row';
import { RowProps } from './row-props';

export const SimpleRowForm: React.FC<RowProps> = (props) => {
  return (
    <Row key={props.txn.id}>
      <div>Hello simple row form</div>
    </Row>
  );
}
