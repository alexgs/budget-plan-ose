/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { CategoryTreeNode, CategoryValues } from './types';

function visitLeaves(
  output: CategoryValues[],
  cats: CategoryTreeNode[],
  parentLabel: string | null = null,
  depth: number = 0
) {
  cats.forEach((cat) => {
    if (!cat.children) {
      throw new Error(
        'Invalid data in `getCategoryList`: `cat.children` is falsy. Did you forget to call `buildCategoryTree`?'
      );
    }

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

export function getCategoryList(data: CategoryTreeNode[]): CategoryValues[] {
  const output: CategoryValues[] = [];
  visitLeaves(output, data);
  return output;
}
