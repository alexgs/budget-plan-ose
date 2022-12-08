/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  Box,
  Button,
  createStyles,
  Drawer,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { signIn, signOut, useSession } from 'next-auth/react';
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

  const { data: session } = useSession();
  const content = session ? (
    <>
      Signed in as {session.user?.name} <br />
      <Button onClick={() => signOut()} variant="outline">
        Sign out
      </Button>
    </>
  ) : (
    <>
      <Button onClick={() => signIn()} variant="outline">
        Sign in
      </Button>
    </>
  );

  if (isXsScreen) {
    return (
      <Drawer
        title="Budget Plan 🥽"
        onClose={props.onClose}
        opened={props.isOpened}
        styles={{
          header: {
            padding: theme.spacing.md,
            marginBottom: 0,
          },
        }}
      >
        <Box
          className={classes.navbarContainer}
          style={{ height: 'calc(100% - 60px)' }}
        >
          <Stack justify="space-between" style={{ height: '100%' }}>
            {props.children}
            <div style={{ marginTop: 'auto' }}>{content}</div>
          </Stack>
        </Box>
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
