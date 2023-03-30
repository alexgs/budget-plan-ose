/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '@mantine/core';
import React from 'react';

interface Props {
  isExpanded: boolean;
  onClick: VoidFunction;
}

// TODO Add animation to turning the chevron when expanding or collapsing rows

export const ExpandRowButton: React.FC<Props> = (props) => {
  const icon = props.isExpanded ? faChevronDown : faChevronRight;
  return (
    <UnstyledButton onClick={props.onClick}>
      <FontAwesomeIcon icon={icon} />
    </UnstyledButton>
  );
};
