/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faSplit } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group } from '@mantine/core';
import React from 'react';

interface Props {
  onSplitClick: VoidFunction;
}

export const SplitButton: React.FC<Props> = (props) => (
  <Group position="left" mt="md">
    <Button onClick={props.onSplitClick} variant="outline">
      <FontAwesomeIcon icon={faSplit} size="lg" />
    </Button>
  </Group>
);
