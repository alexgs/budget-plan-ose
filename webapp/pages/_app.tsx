import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import type { AppProps as DefaultAppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';
import { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';

import { theme } from '../components/mantine-theme';

import '@fontsource/inter/variable.css';

interface AppProps extends DefaultAppProps<{ session: Session }> {
  Component: NextComponentType<NextPageContext, any, any> & { isPublic?: boolean };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        {Component.isPublic ? (
          <Component {...pageProps} />
        ) : (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        )}
      </MantineProvider>
    </SessionProvider>
  );
}

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
