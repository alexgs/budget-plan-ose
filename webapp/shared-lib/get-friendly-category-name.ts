/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Category } from './types';

export function getFriendlyCategoryName(
  categories: Category[],
  categoryId: string
) {
  return (
    categories.find((category) => category.id === categoryId)?.name ?? 'Unknown'
  );
}
