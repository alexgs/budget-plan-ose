/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';
import { Account, Category } from '../../../shared-lib';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  formOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  mantineForm: NewTransactionFormHook;
  onAccountChange: (accountId: string) => void;
  onCancel: VoidFunction;
}

export const CategoryTransferForm: React.FC<Props> = (props) => {
  return <div>Hello category transfer</div>
}
