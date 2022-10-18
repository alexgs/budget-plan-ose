/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusLarge } from '@fortawesome/pro-solid-svg-icons'
import { Affix, Button } from '@mantine/core';
import { FC } from 'react';

export const AddTransactionButton: FC = () => {
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          onClick={() => {
            console.log('>> click <<');
          }}
        >
          <FontAwesomeIcon icon={faPlusLarge} />
        </Button>
      </Affix>
    </>
  );
};
