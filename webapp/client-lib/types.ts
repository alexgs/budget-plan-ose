export interface categoryTreeNode {
  id: string;
  name: string;
  order: number | null;
  parentId: string | null;
  slug: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  children: categoryTreeNode[];
}

export interface rawCategory {
  id: string;
  name: string;
  order: number | null;
  parentId: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  currentValue: rawCurrentValue[];
}

export interface rawCurrentValue {
  id: string;
  categoryId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}
