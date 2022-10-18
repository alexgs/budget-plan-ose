/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { createStyles } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

const useStyles = createStyles((theme) => ({
  page: {
    padding: theme.spacing.sm,
    width: '100%',

    [`@media screen and (min-width: ${theme.breakpoints.xs}px)`]: {
      margin: `${theme.spacing.xs}px auto`,
      padding: 0,
      width: theme.breakpoints.xs,
    },

    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      margin: `${theme.spacing.xs}px auto`,
      padding: 0,
      width: theme.breakpoints.sm,
    },
  },
}));

export const Page: FC<PropsWithChildren> = (props) => {
  const { classes } = useStyles();
  return <div className={classes.page}>{props.children}</div>;
};
