import { buildCategoryTree } from './build-category-tree';
import { categoryTreeNode, rawCategory } from './types';

interface categoryValues {
  id: string; // UUID of this category
  balance: number | null; // Current balance in cents
  label: string; // Slash-separated joining of category's name with parent's name
}

function visitLeaves(
  output: categoryValues[],
  cats: categoryTreeNode[],
  parentLabel: string | null = null
) {
  cats.forEach((cat) => {
    const label = parentLabel ? parentLabel + '/' + cat.name : cat.name;
    const { id, balance } = cat;
    output.push({ id, balance, label });
    visitLeaves(output, cat.children, label);
  });
  return output;
}

export function getCategoryList(data: rawCategory[]): categoryValues[] {
  const catTree = buildCategoryTree(data);

  const output: categoryValues[] = [];
  visitLeaves(output, catTree);
  return output;
}
