/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect, Select } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';
import { contentWidth } from '../../tokens';

interface Props {
  categories: { label: string; value: string }[];
  index?: number;
  mantineForm: NewTransactionFormHook;
}

export const CategoryField: React.FC<Props> = (props) => {
  const index = props.index ?? 0;
  const viewport = useViewportSize();

  if (viewport.width > contentWidth.medium) {
    return (
      <Select
        data={props.categories}
        label="Category"
        my="sm"
        required
        searchable
        {...props.mantineForm.getInputProps(`amounts.${index}.categoryId`)}
      />
    );
  }

  return (
    <NativeSelect
      data={props.categories}
      label="Category"
      my="sm"
      required
      {...props.mantineForm.getInputProps(`amounts.${index}.categoryId`)}
    />
  );
};
