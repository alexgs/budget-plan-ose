/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { showNotification } from '@mantine/notifications';
import React from 'react';

import { api } from '../../../client-lib/api';
import { ApiSchema, TransactionType } from '../../../shared-lib';

import { RowProps } from './row-props';
import { SimpleRowDisplay } from './SimpleRowDisplay';
import { SimpleRowForm } from './SimpleRowForm';

export const SimpleRow: React.FC<RowProps> = (props) => {
  const [isEditing, setEditing] = React.useState(false);

  function handleEditClick() {
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
  }

  function handleSubmit(
    values: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
  ) {
    if ('id' in values) {
      const updateValues: ApiSchema.UpdateTransaction = values;
      api
        .postExtantTransaction(updateValues)
        .then((response) => response.json())
        .then((json) => {
          showNotification({
            message: `Saved transaction "${json.description}"`,
            title: 'Success',
          });
        })
        .catch((e) => {
          console.error(e);
          showNotification({
            color: 'red',
            message: 'Something went wrong! Please check the logs.',
            title: 'Error',
          });
        })
        .finally(() => {
          setEditing(false);
        });
    } else {
      const newValues: ApiSchema.NewTransaction = values;
      api
        .postNewTransaction(newValues)
        .then((response) => response.json())
        .then((json) => {
          showNotification({
            message: `Saved transaction "${json.description}"`,
            title: 'Success',
          });
        })
        .catch((e) => {
          console.error(e);
          showNotification({
            color: 'red',
            message: 'Something went wrong! Please check the logs.',
            title: 'Error',
          });
        })
        .finally(() => {
          setEditing(false);
        });
    }
  }

  if (isEditing) {
    // TODO All of the type-casting in here is kind of ugly
    const temp: Partial<ApiSchema.Transaction> = {
      ...props.txn,
      id: props.txn.id as string,
      type: props.txn.type as TransactionType,
    };
    delete temp.createdAt;
    delete temp.updatedAt;

    const data: ApiSchema.UpdateTransaction = {
      ...temp,
      date: new Date(props.txn.date),
    } as ApiSchema.UpdateTransaction;

    return (
      <SimpleRowForm
        accountData={props.accountData}
        categoryData={props.categoryData}
        data={data}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
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
