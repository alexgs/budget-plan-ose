import { clone } from 'lodash-es';
import { categoryTreeNode } from './types';

function cloneToDepth(
  node: categoryTreeNode,
  currentDepth: number,
  maxDepth: number
) {
  let children: categoryTreeNode[] = [];
  if (currentDepth <= maxDepth) {
    children = clone(node.children);
    children.forEach((node) => cloneToDepth(node, currentDepth + 1, maxDepth));
  }
  const output = clone(node);
  output.children = children;
  return output;
}

export function parseCategoryTree(
  tree: categoryTreeNode[],
  rootNode: string
): categoryTreeNode[];
export function parseCategoryTree(
  tree: categoryTreeNode[],
  depth: number
): categoryTreeNode[];
export function parseCategoryTree(
  tree: categoryTreeNode[],
  rootOrDepth: number | string
): categoryTreeNode[] {
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
