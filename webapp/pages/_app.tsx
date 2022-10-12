import type { AppProps } from 'next/app';
import '@fontsource/inter/variable.css';
import 'normalize.css/normalize.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
