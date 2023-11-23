/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import React from 'react';
import useSWR from 'swr';
import { ApiSchema } from '../../shared-lib/schema-v2/api-schema';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { transformers } from '../../shared-lib/transformers';

interface AllAccountsResponse {
  accounts?: ModelSchema.Account[];
  error?: Error;
  isLoading: boolean;
}

export function useAllAccounts(): AllAccountsResponse {
  const { data, error, isLoading } = useSWR<ApiSchema.Account[], Error>(
    `/api/v2/accounts`,
    { refreshInterval: 1000 },
  );
  const accounts = React.useMemo(
    () => data?.map((txn) => transformers.accountApiToModel(txn)),
    [data]
  );
  return {
    accounts,
    error,
    isLoading,
  };
}
