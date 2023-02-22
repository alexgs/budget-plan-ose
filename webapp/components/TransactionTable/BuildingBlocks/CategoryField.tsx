/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect, Select } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';
import { buildCategoryTree, getCategoryList } from '../../../client-lib';
import { NewTransactionFormHook } from '../../../client-lib/types';
import { Category } from '../../../shared-lib';
import { contentWidth } from '../../tokens';

interface Props {
  categoryData: Category[];
  index?: number;
  mantineForm: NewTransactionFormHook;
}

export const CategoryField: React.FC<Props> = (props) => {
  const categories = getCategoryList(buildCategoryTree(props.categoryData))
    .filter((cat) => cat.isLeaf)
    .map((cat) => ({
      value: cat.id,
      label: cat.label,
    }));
  const index = props.index ?? 0;
  const viewport = useViewportSize();

  if (viewport.width > contentWidth.medium) {
    return (
      <Select
        data={categories}
        my="sm"
        required
        searchable
        {...props.mantineForm.getInputProps(`amounts.${index}.categoryId`)}
      />
    );
  }

  return (
    <NativeSelect
      data={categories}
      my="sm"
      required
      {...props.mantineForm.getInputProps(`amounts.${index}.categoryId`)}
    />
  );
};
