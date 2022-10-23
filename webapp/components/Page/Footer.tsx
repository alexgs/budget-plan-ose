/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Box, createStyles } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
  footerContainer: {
    padding: theme.spacing.md,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export const Footer: FC = () => {
  // TODO Tighten security so I'm the only one who can access this app
  const { data: session } = useSession();
  const { classes } = useStyles();
  if (session) {
    return (
      <Box className={classes.footerContainer}>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </Box>
    )
  }

  return (
    <Box
      className={classes.footerContainer}>
      <button onClick={() => signIn()}>Sign in</button>
    </Box>
  );

}
