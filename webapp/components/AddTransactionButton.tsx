/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusLarge } from '@fortawesome/pro-solid-svg-icons';
import { Affix, Button, createStyles } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.lime[8],
  },
}));

export const AddTransactionButton: FC = () => {
  const { classes } = useStyles();
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Link href="/transactions/new" passHref>
          <Button className={classes.button} component="a">
            <FontAwesomeIcon icon={faPlusLarge} />
          </Button>
        </Link>
      </Affix>
    </>
  );
};
