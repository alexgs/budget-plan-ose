/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect, Select } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';
import { buildCategoryTree, getCategoryList } from '../../../client-lib';
import { Category } from '../../../shared-lib';
import { contentWidth } from '../../tokens';

interface Props {
  categoryData: Category[];
  [key: string]: unknown;
}

export const CategoryField: React.FC<Props> = (props) => {
  const {categoryData, ...otherProps} = props;
  const categories = getCategoryList(buildCategoryTree(categoryData))
    .filter((cat) => cat.isLeaf)
    .map((cat) => ({
      value: cat.id,
      label: cat.label,
    }));
  const viewport = useViewportSize();

  if (viewport.width > contentWidth.medium) {
    return (
      <Select
        data={categories}
        required
        searchable
        {...otherProps}
      />
    );
  }

  return (
    <NativeSelect
      data={categories}
      required
      {...otherProps}
    />
  );

};
