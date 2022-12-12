/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { buildCategoryTree } from './build-category-tree';
import { cloneCategoryTree } from './clone-category-tree';
import { CategoryTreeNode, RawCategory } from './types';

describe('Function `cloneCategoryTree`', () => {
  it('clones a category tree to the specified depth', () => {
    const rawCategories: RawCategory[] = [
      {
        id: '8a7b038b-673d-4a45-b047-20c9ccb25e82',
        balance: null,
        name: 'Entertainment',
        order: null,
        parentId: null,
        createdAt: new Date('2022-10-21T11:29:30.365Z'),
        updatedAt: new Date('2022-10-21T11:29:30.365Z'),
      },
      {
        id: 'c48c2c7e-9689-4954-8101-9872c5aa82a4',
        balance: 349,
        name: 'Disney+',
        order: null,
        parentId: '8a7b038b-673d-4a45-b047-20c9ccb25e82',
        createdAt: new Date('2022-10-21T11:29:30.376Z'),
        updatedAt: new Date('2022-10-21T11:29:30.376Z'),
      },
      {
        id: '8f11d859-3a25-4656-bffa-235a9d5913d4',
        balance: 0,
        name: 'Prime Video',
        order: null,
        parentId: '8a7b038b-673d-4a45-b047-20c9ccb25e82',
        createdAt: new Date('2022-10-21T11:29:30.384Z'),
        updatedAt: new Date('2022-10-21T11:29:30.384Z'),
      },
      {
        id: '0b2c7ac5-b714-4282-adf4-062cb10fc1ff',
        balance: 1599,
        name: 'Netflix',
        order: null,
        parentId: '8a7b038b-673d-4a45-b047-20c9ccb25e82',
        createdAt: new Date('2022-10-21T11:29:30.391Z'),
        updatedAt: new Date('2022-10-21T11:29:30.391Z'),
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
      {
        id: '93645e5c-e49c-4b20-a8fa-043a69998d08',
        balance: -2556,
        name: 'Groceries',
        order: 2,
        parentId: null,
        createdAt: new Date('2022-10-21T11:29:30.392Z'),
        updatedAt: new Date('2022-10-23T13:33:50.346Z'),
      },
      {
        id: 'e28c6f53-3a3f-435f-939d-77501abf7554',
        balance: -13624,
        name: 'Kids',
        order: null,
        parentId: null,
        createdAt: new Date('2022-10-21T11:29:30.393Z'),
        updatedAt: new Date('2022-10-23T13:33:50.364Z'),
      },
      {
        id: 'b76aa2eb-8a33-47cc-a52b-bbacd1a67d66',
        balance: 10,
        name: 'Hulu',
        order: null,
        parentId: '8a7b038b-673d-4a45-b047-20c9ccb25e82',
        createdAt: new Date('2022-10-21T11:29:30.375Z'),
        updatedAt: new Date('2022-10-25T09:53:17.703Z'),
      },
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
        id: '0b74b558-86d1-45dc-9af5-41da2e099731',
        balance: 9500,
        name: 'Clothes',
        order: null,
        parentId: null,
        createdAt: new Date('2022-10-21T11:29:30.383Z'),
        updatedAt: new Date('2022-10-31T10:18:10.533Z'),
      },
    ];
    const tree: CategoryTreeNode[] = buildCategoryTree(rawCategories);
    const output = cloneCategoryTree(tree, 0);

    const expectedValue: CategoryTreeNode[] = [
      {
        ...tree[0],
        children: [],
      },
      {
        ...tree[1],
        children: [],
      },
      {
        ...tree[2],
        children: [],
      },
      {
        ...tree[3],
        children: [],
      },
      {
        ...tree[4],
        children: [],
      },
    ];
    expect(output).toEqual(expectedValue);
  });
});
