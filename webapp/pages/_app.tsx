import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { globalStyles } from '../components';
import '@fontsource/inter/variable.css';
import 'normalize.css/normalize.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}
