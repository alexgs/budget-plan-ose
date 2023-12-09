/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { faEllipsis } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Menu } from '@mantine/core';
import { Row } from '@tanstack/table-core';
import React from 'react';
import { TransactionRow } from '../../client-lib/types';

interface Props {
  row: Row<TransactionRow>;
}

export const MeatballMenu: React.FC<Props> = (props) => {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <FontAwesomeIcon icon={faEllipsis} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
