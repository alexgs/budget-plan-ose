/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { createGetInitialProps } from '@mantine/next';
import {
  default as NextDocument,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

const getInitialProps = createGetInitialProps();

// noinspection HtmlRequiredTitleElement
export default class Document extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
