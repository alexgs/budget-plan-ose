/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

export const EditAccountButton: React.FC = () => {
  return <div>
    <UnstyledButton><FontAwesomeIcon icon={faPencil} /></UnstyledButton>
  </div>
}
