/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { ApiSchema, TransactionType } from '../../../shared-lib';

import { RowProps } from './row-props';
import { SimpleRowDisplay } from './SimpleRowDisplay';
import { SimpleRowForm } from './SimpleRowForm';

export const SimpleRow: React.FC<RowProps> = (props) => {
  const [isEditing, setEditing] = React.useState(false);

  function handleEditClick() {
    setEditing(true);
  }

  if (isEditing) {
    // TODO All of the type-casting in here is kind of ugly
    const temp: Partial<ApiSchema.Transaction> = {
      ...props.txn,
      id: props.txn.id as string,
      type: props.txn.type as TransactionType,
    }
    delete temp.createdAt;
    delete temp.updatedAt;

    const data: ApiSchema.UpdateTransaction = {
      ...temp,
      date: new Date(props.txn.date),
    } as ApiSchema.UpdateTransaction

    return (
      <SimpleRowForm
        accountData={props.accountData}
        categoryData={props.categoryData}
        data={data}
      />
    );
  }

  return (
    <SimpleRowDisplay
      accountData={props.accountData}
      categoryData={props.categoryData}
      onEditClick={handleEditClick}
      txn={props.txn}
    />
  );
};
