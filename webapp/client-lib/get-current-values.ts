import { buildCategoryTree } from './build-category-tree';
import { categoryTreeNode, rawCategory } from './types';

interface categoryValues {
  id: string; // UUID of this category
  label: string; // Slash-separated joining of category's name with parent's name
  value: number; // Current balance in cents
}

function visitLeaves(
  output: categoryValues[],
  cats: categoryTreeNode[],
  parentLabel: string | null = null
) {
  cats.forEach((cat) => {
    const label = parentLabel ? parentLabel + '/' + cat.name : cat.name;
    const { id, value } = cat;
    output.push({ id, label, value });
    visitLeaves(output, cat.children, label);
  });
  return output;
}

// TODO This is so similar to getAllCategoryLabels that they could probably be combined into a single function
export function getCurrentValues(data: rawCategory[]): categoryValues[] {
  const catTree = buildCategoryTree(data);

  const output: categoryValues[] = [];
  visitLeaves(output, catTree);
  return output;
}
