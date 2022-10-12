// --- COLORS ---

function formatRgb(rgb: { r: number; g: number; b: number }) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

const colorRbg = {
  // CSS standard color
  gainsboro: {
    r: 220,
    g: 220,
    b: 220,
  },
  // All of these values are taken from the "Space" theme on Workflowy
  background: {
    r: 42,
    g: 49,
    b: 53,
  },
  pink: {
    r: 244,
    g: 114,
    b: 182,
  },
  purple: {
    r: 172,
    g: 148,
    b: 250,
  },
  sky: {
    r: 56,
    g: 189,
    b: 248,
  },
  blue: {
    r: 118,
    g: 169,
    b: 250,
  },
};

export const color = {
  background: formatRgb(colorRbg.background),
  pop: formatRgb(colorRbg.pink),
  primary: formatRgb(colorRbg.purple),
  secondary: formatRgb(colorRbg.sky),
  text: formatRgb(colorRbg.gainsboro),
};

// --- FONTS ---

const typefaces = {
  inter: 'InterVariable, Roboto, "Helvetica Neue", Arial, ui-sans-serif, sans-serif',
};

export const font = {
  face: {
    body: typefaces.inter,
    head: typefaces.inter,
  },
  size: {
    title: '2.5rem', // 40px
    heading1: '2rem', // 32px
    heading2: '1.5rem', // 24px
    heading3: '1.5rem', // 24px
    heading4: '1.25rem', // 20px
    regular: '1rem', // 16px
    kindaSmall: '0.875rem', // 14px
    small: '0.75rem', // 12px
  },
};

// --- RESPONSIVE DESIGN ---

// These sizes are based on [Tailwind's default breakpoints][1]
// [1]: https://tailwindcss.com/docs/screens

export const contentWidth = {
  // Default size is extra-small
  small: 640,
  medium: 768,
  large: 1024,
  xLarge: 1280,
}

export const breakpoint = {
  // Default size is extra-small
  small: `@media screen and (min-width: ${contentWidth.small}px)`,
  medium: `@media screen and (min-width: ${contentWidth.medium}px)`,
  large: `@media screen and (min-width: ${contentWidth.large}px)`,
  xLarge: `@media screen and (min-width: ${contentWidth.xLarge}px)`,
};

// --- SPACING ---

// This scale is based on [Tailwind's default spacing scale][2]
// [2]: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
const spaceBase = {
  nano: '0.0625rem',
  micro: '0.125rem',
  xtraSmall: '0.25rem',
  small: '0.5rem',
  mediumSmall: '0.75rem',
  medium: '1rem',
  mediumLarge: '1.25rem',
  large: '1.5rem',
  xtraLarge: '2rem',
  kilo: '2.5rem',
  mega: '3rem',
  giga: '4rem',
  tera: '5rem',
  peta: '6rem',
};

export const space = {
  ...spaceBase,
  half: spaceBase.small,
  xs: spaceBase.xtraSmall,
  sm: spaceBase.small,
  ms: spaceBase.mediumSmall,
  md: spaceBase.medium,
  ml: spaceBase.mediumLarge,
  lg: spaceBase.large,
  xl: spaceBase.xtraLarge,
};
