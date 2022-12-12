/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { AppProps as DefaultAppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import { globalFetcher } from '../client-lib';
import { NextAuthProvider } from '../components';
import { theme } from '../components/mantine-theme';

import '@fontsource/inter/variable.css';

interface AppProps extends DefaultAppProps<{ session: Session }> {
  Component: NextComponentType<NextPageContext, any, any> & {
    isPublic?: boolean;
  };
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const content = Component.isPublic ? (
    <Component {...pageProps} />
  ) : (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  );

  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <SWRConfig value={{ fetcher: globalFetcher }}>{content}</SWRConfig>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
