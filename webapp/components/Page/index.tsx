/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { FC, PropsWithChildren, useState } from 'react';

import { Footer } from './Footer';
import { NavBar } from './NavBar';

// TODO Put user info in footer (or maybe in footer in navbar)
// TODO Add things to navbar
// TODO Check look at different screen widths

export const Page: FC<PropsWithChildren> = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.dark[8],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <NavBar isOpened={opened} onClose={() => setOpened(false)}>
          <Text>Application navbar</Text>
        </NavBar>
      }
      footer={<Footer />}
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Budget Plan 🥽</Text>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};
