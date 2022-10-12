import { Global } from '@emotion/react';
import { Session } from 'next-auth';
import type { AppProps as DefaultAppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { globalStyles } from '../components';

import '@fontsource/inter/variable.css';
import 'normalize.css/normalize.css';

type AppProps = DefaultAppProps<{ session: Session }>;

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
