/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faChevronRight, faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon } from '@mantine/core';
import { Row } from '@tanstack/table-core';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';

interface Props {
  row: Row<TransactionRow>;
}

export const ChevronButton: React.FC<Props> = (props) => {
  function renderIcon() {
    if (props.row.getIsExpanded()) {
      return <FontAwesomeIcon icon={faChevronDown} />;
    }
    return <FontAwesomeIcon icon={faChevronRight} />;
  }

  if (!props.row.getCanExpand()) {
    return null;
  }

  return (
    <ActionIcon
      onClick={props.row.getToggleExpandedHandler()}
      style={{ cursor: 'pointer' }}
    >
      {renderIcon()}
    </ActionIcon>
  );
};
