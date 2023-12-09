/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import React from 'react';
import useSWR from 'swr';
import { ApiSchema } from '../../shared-lib/schema-v2/api-schema';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { transformers } from '../../shared-lib/transformers';

interface AllTransactionsResponse {
  error?: Error;
  isLoading: boolean;
  transactions?: ModelSchema.Transaction[];
}

export function useAllTransactions(): AllTransactionsResponse {
  const { data, error, isLoading } = useSWR<ApiSchema.Transaction[], Error>(
    `/api/v2/transactions`,
    { refreshInterval: 1000 },
  );
  const transactions = React.useMemo(
    () => data?.map((txn) => transformers.txnApiToModel(txn)),
    [data]
  );
  return {
    error,
    isLoading,
    transactions,
  };
}
