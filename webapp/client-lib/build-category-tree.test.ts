/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { buildCategoryTree } from './build-category-tree';
import { CategoryTreeNode } from './types';

describe('Function `buildCategoryTree`', () => {
  it('builds an empty tree from an empty list', () => {
    const output: CategoryTreeNode[] = buildCategoryTree([]);

    const expectedTree: CategoryTreeNode[] = [];
    expect(output).toEqual(expectedTree);
  });

  it.todo('builds a tree from raw data');
});
