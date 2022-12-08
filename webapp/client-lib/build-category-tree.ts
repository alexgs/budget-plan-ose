/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { cloneDeep } from 'lodash';
import { CategoryTreeNode, RawCategory } from './types';

// Adapted from https://javascript.plainenglish.io/how-to-build-a-tree-array-from-flat-array-in-javascript-8d0414ac1190
function recursiveWorker(
  categories: CategoryTreeNode[],
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
          return sum + (cat.balance ?? 0);
        }, 0);
      }
      return cat;
    });
}

export function buildCategoryTree(
  rawCategoryData: RawCategory[]
): CategoryTreeNode[] {
  const categories: CategoryTreeNode[] = cloneDeep(rawCategoryData).map(
    (cat: RawCategory): CategoryTreeNode => {
      return {
        ...cat,
        children: [],
      };
    }
  );
  return recursiveWorker(categories);
}
