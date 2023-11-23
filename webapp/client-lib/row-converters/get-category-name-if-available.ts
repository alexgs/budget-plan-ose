/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { getFriendlyCategoryName } from '../../shared-lib'; // TODO This function should live in `client-lib`
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';

export default function getCategoryNameIfAvailable(
  categoryId: string,
  categories?: ModelSchema.Category[]
) {
  if (!categories) {
    return '...';
  }

  return getFriendlyCategoryName(categories, categoryId);
}
