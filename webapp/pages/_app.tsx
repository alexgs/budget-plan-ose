import { MantineProvider } from '@mantine/core';
import type { AppProps as DefaultAppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';
import { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

import { theme } from '../components/mantine-theme';

import '@fontsource/inter/variable.css';

interface AuthProps {
  children: ReactNode | ReactNode[];
}

const Auth: React.FC<AuthProps> = (props: AuthProps) => {
  const { children } = props;

  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

const globalFetcher = (resource: RequestInfo | URL, init?: RequestInit) =>
  fetch(resource, init).then((res) => res.json());

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
    <Auth>
      <Component {...pageProps} />
    </Auth>
  );

  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <SWRConfig value={{ fetcher: globalFetcher }}>
          {content}
        </SWRConfig>
      </MantineProvider>
    </SessionProvider>
  );
}
