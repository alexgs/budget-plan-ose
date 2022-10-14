export { globalFetcher } from './global-fetcher';

import { clone, cloneDeep } from 'lodash-es';

interface rawCategory {
  id: string;
  name: string;
  parentId: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface categoryTreeNode {
  id: string;
  name: string;
  parentId: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  children: categoryTreeNode[];
}

interface categoryLabel {
  label: string; // Slash-separated joining of category's name with parent's name
  id: string; // UUID of this category
}

// Adapted from https://javascript.plainenglish.io/how-to-build-a-tree-array-from-flat-array-in-javascript-8d0414ac1190
function buildCategoryTree(
  categories: categoryTreeNode[],
  parentId: string | null = null
): categoryTreeNode[] {
  return categories
    .filter((cat) => cat.parentId === parentId)
    .map((cat) => {
      cat.children = buildCategoryTree(categories, cat.id);
      return cat;
    });
}

function visitLeaves(
  output: categoryLabel[],
  cats: categoryTreeNode[],
  parentLabel: string | null = null
) {
  cats.forEach((cat) => {
    const label = parentLabel ? parentLabel + '/' + cat.name : cat.name;
    visitLeaves(output, cat.children, label);
    output.push({ label, id: cat.id });
  });
  return output;
}

export function getAllCategoryLabels(data: rawCategory[]): categoryLabel[] {
  const allCats: categoryTreeNode[] = cloneDeep(data).map(
    (cat): categoryTreeNode => ({ ...cat, children: [] })
  );
  const catTree = buildCategoryTree(allCats);

  const output: categoryLabel[] = [];
  visitLeaves(output, catTree);
  return output;
}
