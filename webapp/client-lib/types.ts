export interface categoryTreeNode {
  id: string;
  balance: number | null;
  children: categoryTreeNode[];
  name: string;
  order: number | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface rawCategory {
  id: string;
  balance: number | null;
  name: string;
  order: number | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}
