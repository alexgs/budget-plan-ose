/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { UseFormReturnType } from '@mantine/form';
import { FinancialAccount as PrismaFinancialAccount } from '@prisma/client';

import { AccountType, ApiSchema } from '../shared-lib';

export interface CategoryTreeNode {
  id: string;
  balance: number | null;
  children: CategoryTreeNode[];
  name: string;
  order: number | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryValues {
  balance: number | null; // Current balance in cents
  depth: number;
  id: string; // UUID of this category
  isLeaf: boolean;
  label: string; // Slash-separated joining of category's name with parent's name
}

export interface FinancialAccount extends PrismaFinancialAccount {
    accountType: AccountType;
}

export type NewTransactionFormHook =
  UseFormReturnType<NewTransactionFormValues>;

export type NewTransactionFormValues = ApiSchema.NewTransaction & {
  balance: number; // Client-only field
  isCredit: boolean; // Client-only field
};

export interface RawCategory {
  id: string;
  balance: number | null;
  name: string;
  order: number | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
