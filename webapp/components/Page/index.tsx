/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import {
  faMoneyBillWave,
  faPieChart,
  faPiggyBank,
  faSackDollar,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  NavLink,
  Text,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useState } from 'react';

import { NavBar } from './NavBar';

// TODO Add things to navbar
// TODO Use a real CSS grid for layout instead of Mantine's AppShell component

export const Page: FC<PropsWithChildren> = (props) => {
  const theme = useMantineTheme();
  const router = useRouter();
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
          <Link href="/" passHref>
            <NavLink
              active={router.pathname === '/'}
              component="a"
              label="Home"
              icon={<FontAwesomeIcon icon={faPieChart} />}
            />
          </Link>
          <Link href="/transactions/new" passHref>
            <NavLink
              active={router.pathname === '/transactions/new'}
              component="a"
              icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
              label="Add New Transaction"
            />
          </Link>
          <Link href="/transactions/deposit" passHref>
            <NavLink
              active={router.pathname === '/transactions/deposit'}
              component="a"
              icon={<FontAwesomeIcon icon={faSackDollar} />}
              label="Record a Deposit"
            />
          </Link>
          <Link href="/accounts" passHref>
            <NavLink
              active={router.pathname === '/accounts'}
              component="a"
              icon={<FontAwesomeIcon icon={faPiggyBank} />}
              label="View Accounts"
            />
          </Link>
        </NavBar>
      }
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
