import { Global } from '@emotion/react';
import '@fontsource/inter/variable.css';
import type { AppProps as DefaultAppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils';
import { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';

import { globalStyles } from '../components';

import 'normalize.css/normalize.css';

interface AppProps extends DefaultAppProps<{ session: Session }> {
  Component: NextComponentType<NextPageContext, any, any> & { auth?: boolean };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Global styles={globalStyles} />
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
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

  return <>{ children }</>;
}
