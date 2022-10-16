import { categoryTreeNode } from './types';

// Adapted from https://javascript.plainenglish.io/how-to-build-a-tree-array-from-flat-array-in-javascript-8d0414ac1190
export function buildCategoryTree(
  categories: categoryTreeNode[],
  parentId: string | null = null
): categoryTreeNode[] {
  return categories
    .filter((cat) => cat.parentId === parentId)
    .sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      } else if (a.order) {
        return -1;
      } else if (b.order) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    })
    .map((cat) => {
      cat.children = buildCategoryTree(categories, cat.id);
      return cat;
    });
}
