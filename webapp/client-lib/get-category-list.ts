/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { buildCategoryTree } from './build-category-tree';
import { CategoryTreeNode, RawCategory } from './types';

interface categoryValues {
  balance: number | null; // Current balance in cents
  depth: number;
  id: string; // UUID of this category
  isLeaf: boolean;
  label: string; // Slash-separated joining of category's name with parent's name
}

function visitLeaves(
  output: categoryValues[],
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

export function getCategoryList(data: RawCategory[]): categoryValues[] {
  const catTree = buildCategoryTree(data);

  const output: categoryValues[] = [];
  visitLeaves(output, catTree);
  return output;
}
