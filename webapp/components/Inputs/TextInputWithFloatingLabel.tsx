/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { FC, useState } from 'react';
import { TextInput, createStyles } from '@mantine/core';

// Adapted from https://ui.mantine.dev/component/floating-label-input

const useStyles = createStyles(
  (theme, { floating }: { floating: boolean }) => ({
    root: {
      position: 'relative',
    },

    label: {
      position: 'absolute',
      zIndex: 2,
      top: 7,
      left: theme.spacing.sm,
      pointerEvents: 'none',
      color: floating ? theme.white : theme.colors.dark[3],
      transition:
        'transform 150ms ease, color 150ms ease, font-size 150ms ease',
      transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
      fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
      fontWeight: floating ? 500 : 400,
    },

    required: {
      transition: 'opacity 150ms ease',
      opacity: floating ? 1 : 0,
    },

    input: {
      '&::placeholder': {
        transition: 'color 150ms ease',
        color: !floating ? 'transparent' : undefined,
      },
    },
  })
);

interface Props {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

export const TextInputWithFloatingLabel: FC<Props> = (props) => {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: props.value.trim().length !== 0 || focused,
  });

  return (
    <TextInput
      label={props.label}
      placeholder={props.placeholder}
      required
      classNames={classes}
      value={props.value}
      onChange={(event) => props.onChange(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
    />
  );
};
