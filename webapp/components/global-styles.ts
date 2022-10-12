import { GlobalProps } from '@emotion/react';
import { color, font, space } from './tokens';

export const globalStyles: GlobalProps['styles'] = {
  'html,body': {
    background: color.background,
    boxSizing: 'border-box',
    color: color.text,
    fontFamily: font.face.body,
    fontSize: 16,
    fontWeight: 400,
    margin: 0,
    padding: 0,
  },

  // body: {
  //   marginBottom: space.medium,
  // },

  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },

  // a: {
  //   borderBottom: '1px dotted',
  //   color: color.accent,
  //   textDecoration: 'none',
  //
  //   ':active': {
  //     borderBottom: '1px solid',
  //     textDecoration: 'none',
  //   },
  //
  //   ':hover': {
  //     borderBottom: '1px solid',
  //     textDecoration: 'none',
  //   },
  // },

  'h1, h2, h3, h4, h5, h6': {
    fontFamily: font.face.head,
    // marginBottom: space.xs,
    // marginTop: space.medium,
  },

  // h1: {
  //   fontSize: font.size.title,
  //   fontWeight: font.weight.title,
  //   letterSpacing: '2.5px',
  //   textAlign: 'center',
  // },
  //
  // h2: {
  //   fontSize: font.size.heading1,
  //   fontWeight: font.weight.heading1,
  // },
  //
  // h3: {
  //   fontSize: font.size.heading2,
  //   fontWeight: font.weight.heading2,
  // },
  //
  // h4: {
  //   fontSize: font.size.heading3,
  //   fontWeight: font.weight.heading3,
  // },
  //
  // h5: {
  //   fontSize: font.size.heading4,
  //   fontWeight: font.weight.heading4,
  // },
  //
  // 'li > p': {
  //   marginTop: 0,
  // },
  //
  // 'ol, ul': {
  //   lineHeight: font.lineHeight.body,
  //   marginTop: 0,
  //   marginBottom: 0,
  // },
  //
  // p: {
  //   lineHeight: font.lineHeight.body,
  //   marginBottom: 0,
  // },

  // Initial paragraphs after a heading
  // 'h1 + p, h2 + p, h3 + p, h4 + p, h5 + p': {
  //   marginTop: 0,
  // },
};
