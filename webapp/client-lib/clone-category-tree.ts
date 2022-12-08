/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { clone } from 'lodash';
import { CategoryTreeNode } from './types';

function cloneToDepth(
  node: CategoryTreeNode,
  currentDepth: number,
  maxDepth: number
) {
  let children: CategoryTreeNode[] = [];
  const childrenDepth = currentDepth + 1;
  if (childrenDepth <= maxDepth) {
    children = clone(node.children);
    children.forEach((node) => cloneToDepth(node, childrenDepth, maxDepth));
  }
  const output = clone(node);
  output.children = children;
  return output;
}

export function cloneCategoryTree(
  tree: CategoryTreeNode[],
  rootNode: string
): CategoryTreeNode[];
export function cloneCategoryTree(
  tree: CategoryTreeNode[],
  depth: number
): CategoryTreeNode[];
export function cloneCategoryTree(
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
