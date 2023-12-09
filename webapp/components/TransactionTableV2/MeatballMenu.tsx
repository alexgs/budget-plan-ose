/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faEllipsis, faPen } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Menu } from '@mantine/core';
import { Row } from '@tanstack/table-core';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';

interface Props {
  onEditClick: (transactionId: string) => void;
  row: Row<TransactionRow>;
}

export const MeatballMenu: React.FC<Props> = (props) => {
  // Don't render on child rows
  if (props.row.parentId) {
    return null;
  }

  function handleEditClick() {
    props.onEditClick(props.row.original.id);
  }

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <FontAwesomeIcon icon={faEllipsis} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<FontAwesomeIcon icon={faPen} />}
          onClick={handleEditClick}
        >
          Edit
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
