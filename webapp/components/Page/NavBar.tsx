/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Box, createStyles, Drawer, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isOpened: boolean;
  onClose: VoidFunction;
}

const useStyles = createStyles((theme) => ({
  navbarContainer: {
    padding: theme.spacing.md,
  },
}));

export const NavBar: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const isXsScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes } = useStyles();

  if (isXsScreen) {
    return (
      <Drawer
        title="Budget Plan"
        onClose={props.onClose}
        opened={props.isOpened}
        styles={{
          header: {
            padding: theme.spacing.md,
            marginBottom: 0,
          },
        }}
      >
        <Box className={classes.navbarContainer}>{props.children}</Box>
      </Drawer>
    );
  }

  return (
    <Box
      className={classes.navbarContainer}
      sx={{ marginTop: 70, section: 'navbar' }}
    >
      {props.children}
    </Box>
  );
};
