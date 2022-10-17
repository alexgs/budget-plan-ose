import { cloneDeep } from 'lodash-es';
import { categoryTreeNode, rawCategory } from './types';

// Adapted from https://javascript.plainenglish.io/how-to-build-a-tree-array-from-flat-array-in-javascript-8d0414ac1190
function recursiveWorker(
  categories: categoryTreeNode[],
  parentId: string | null = null
) {
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
      cat.children = recursiveWorker(categories, cat.id);
      if (cat.children.length > 0) {
        cat.balance = cat.children.reduce((sum, cat) => {
          return sum + (cat.balance ?? 0)
        }, 0);
      }
      return cat;
    });
}

export function buildCategoryTree(
  rawCategoryData: rawCategory[]
): categoryTreeNode[] {
  const categories: categoryTreeNode[] = cloneDeep(rawCategoryData).map(
    (cat: rawCategory): categoryTreeNode => {
      return {
        ...cat,
        children: [],
      };
    }
  );
  return recursiveWorker(categories);
}
