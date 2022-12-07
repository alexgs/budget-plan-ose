/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { buildCategoryTree } from './build-category-tree';
import { CategoryTreeNode, CategoryValues, RawCategory } from './types';

function visitLeaves(
  output: CategoryValues[],
  cats: CategoryTreeNode[],
  parentLabel: string | null = null,
  depth: number = 0
) {
  cats.forEach((cat) => {
    const label = parentLabel ? parentLabel + '/' + cat.name : cat.name;
    const { id, balance } = cat;
    output.push({
      balance,
      depth,
      id,
      label,
      isLeaf: cat.children.length === 0,
    });
    visitLeaves(output, cat.children, label, depth + 1);
  });
  return output;
}

// TODO Change this so that the argument type is `CategoryTreeNode[]` (i.e. you have to manually call `buildCategoryTree` on the raw data before you can use this function

export function getCategoryList(data: RawCategory[]): CategoryValues[] {
  const catTree = buildCategoryTree(data);

  const output: CategoryValues[] = [];
  visitLeaves(output, catTree);
  return output;
}
