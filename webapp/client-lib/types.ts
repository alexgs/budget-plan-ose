/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { UseFormReturnType } from '@mantine/form';

export interface CategoryTreeNode {
  id: string;
  balance: number | null;
  children: CategoryTreeNode[];
  name: string;
  order: number | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type NewTransactionFormHook = UseFormReturnType<{
  amounts: {
    account: any;
    amount: number;
    category: any;
    id: string;
    isCredit: boolean;
    notes: string;
  }[];
  description: string;
  id: string;
  isCredit: boolean;
  transactionDate: Date;
  transactionType: string;
}>;

export interface RawCategory {
  id: string;
  balance: number | null;
  name: string;
  order: number | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
