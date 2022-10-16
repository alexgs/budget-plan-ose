import { cloneDeep } from 'lodash-es';
import { buildCategoryTree } from './build-category-tree';
import { categoryTreeNode, rawCategory } from './types';

interface categoryLabel {
  label: string; // Slash-separated joining of category's name with parent's name
  id: string; // UUID of this category
}

function visitLeaves(
  output: categoryLabel[],
  cats: categoryTreeNode[],
  parentLabel: string | null = null
) {
  cats.forEach((cat) => {
    const label = parentLabel ? parentLabel + '/' + cat.name : cat.name;
    output.push({ label, id: cat.id });
    visitLeaves(output, cat.children, label);
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
