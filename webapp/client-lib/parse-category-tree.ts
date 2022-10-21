/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { clone } from 'lodash-es';
import { CategoryTreeNode } from './types';

function cloneToDepth(
  node: CategoryTreeNode,
  currentDepth: number,
  maxDepth: number
) {
  let children: CategoryTreeNode[] = [];
  if (currentDepth <= maxDepth) {
    children = clone(node.children);
    children.forEach((node) => cloneToDepth(node, currentDepth + 1, maxDepth));
  }
  const output = clone(node);
  output.children = children;
  return output;
}

export function parseCategoryTree(
  tree: CategoryTreeNode[],
  rootNode: string
): CategoryTreeNode[];
export function parseCategoryTree(
  tree: CategoryTreeNode[],
  depth: number
): CategoryTreeNode[];
export function parseCategoryTree(
  tree: CategoryTreeNode[],
  rootOrDepth: number | string
): CategoryTreeNode[] {
  let root: string = '';
  let depth: number = -1;
  if (typeof rootOrDepth === 'number') {
    depth = rootOrDepth;
    return tree.map((node) => cloneToDepth(node, 0, depth));
  } else {
    root = rootOrDepth;
    throw new Error('Not yet implemented');
  }
}
