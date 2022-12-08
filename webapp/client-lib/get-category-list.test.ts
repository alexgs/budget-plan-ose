/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { buildCategoryTree } from './build-category-tree';
import { getCategoryList } from './get-category-list';
import { CategoryTreeNode, CategoryValues, RawCategory } from './types';

describe('Function `getCategoryList`', () => {
  it('returns a parent and children in order', () => {
    const rawCategories: RawCategory[] = [
      {
        id: '1f0bb659-659d-462e-8249-1c403304fa80',
        balance: null,
        name: 'House',
        order: 1,
        parentId: null,
        createdAt: new Date('2022-10-21T11:29:30.343Z'),
        updatedAt: new Date('2022-10-31T10:11:24.917Z'),
      },
      {
        id: '579912cd-a26d-41b5-8cdb-17addc41dc52',
        balance: 186869,
        name: 'Mortgage',
        order: 1,
        parentId: '1f0bb659-659d-462e-8249-1c403304fa80',
        createdAt: new Date('2022-10-21T11:31:39.686Z'),
        updatedAt: new Date('2022-10-25T21:50:47.767Z'),
      },
      {
        id: '03eda307-6993-4dc7-a44c-8a72dc5a9c68',
        balance: 9342,
        name: 'HOA',
        order: 2,
        parentId: '1f0bb659-659d-462e-8249-1c403304fa80',
        createdAt: new Date('2022-10-21T11:31:39.671Z'),
        updatedAt: new Date('2022-10-31T10:18:10.532Z'),
      },
      {
        id: '3b11b8da-a46c-4716-bb04-7c72a855bfcd',
        balance: 4999,
        name: 'Repairs & maintenance',
        order: 3,
        parentId: '1f0bb659-659d-462e-8249-1c403304fa80',
        createdAt: new Date('2022-10-21T11:31:39.679Z'),
        updatedAt: new Date('2022-10-21T11:31:39.679Z'),
      },
    ];
    const categories: CategoryTreeNode[] = buildCategoryTree(rawCategories);
    const output: CategoryValues[] = getCategoryList(categories);

    const expectedValue: CategoryValues[] = [
      {
        id: '1f0bb659-659d-462e-8249-1c403304fa80',
        balance: null,
        depth: 0,
        isLeaf: false,
        label: 'House',
      },
      {
        id: '579912cd-a26d-41b5-8cdb-17addc41dc52',
        balance: 186869,
        depth: 1,
        isLeaf: true,
        label: 'House/Mortgage',
      },
      {
        id: '03eda307-6993-4dc7-a44c-8a72dc5a9c68',
        balance: 9342,
        depth: 1,
        isLeaf: true,
        label: 'House/HOA',
      },
      {
        id: '3b11b8da-a46c-4716-bb04-7c72a855bfcd',
        balance: 4999,
        depth: 1,
        isLeaf: true,
        label: 'House/Repairs & maintenance',
      },
    ];
    expectedValue[0].balance =
      (expectedValue[1].balance ?? 0) +
      (expectedValue[2].balance ?? 0) +
      (expectedValue[3].balance ?? 0);
    expect(output).toEqual(expectedValue);
  });
});
