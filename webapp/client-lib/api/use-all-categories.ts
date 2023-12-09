/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import React from 'react';
import useSWR from 'swr';
import { ApiSchema } from '../../shared-lib/schema-v2/api-schema';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { transformers } from '../../shared-lib/transformers';

interface AllCategoriesResponse {
  categories?: ModelSchema.Category[];
  error?: Error;
  isLoading: boolean;
}

export function useAllCategories(): AllCategoriesResponse {
  const { data, error, isLoading } = useSWR<ApiSchema.Category[], Error>(
    `/api/v2/categories`,
    { refreshInterval: 1000 },
  );
  const categories = React.useMemo(
    () => data?.map((category) => transformers.categoryApiToModel(category)),
    [data]
  );
  return {
    categories,
    error,
    isLoading,
  };
}
