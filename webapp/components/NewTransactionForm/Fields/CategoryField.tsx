/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NativeSelect } from '@mantine/core';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';

interface Props {
  categories: { label: string; value: string }[];
  index?: number;
  mantineForm: NewTransactionFormHook;
}

export const CategoryField: React.FC<Props> = (props) => {
  const index = props.index ?? 0;
  return (
    <NativeSelect
      data={props.categories}
      label="Category"
      my="sm"
      required
      {...props.mantineForm.getInputProps(`amounts.${index}.categoryId`)}
    />
  );
};
