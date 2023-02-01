/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

interface Props {}

export const EditCategoryButton: React.FC<Props> = (props) => {
  return (
    <UnstyledButton>
      <FontAwesomeIcon icon={faPencil} />
    </UnstyledButton>
  );
};
