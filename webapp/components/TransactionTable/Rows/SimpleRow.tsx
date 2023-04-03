/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import React from 'react';

import { RowProps } from './row-props';
import { SimpleRowDisplay } from './SimpleRowDisplay';
import { SimpleRowForm } from './SimpleRowForm';

export const SimpleRow: React.FC<RowProps> = (props) => {
  const [isEditing, setEditing] = React.useState(false);

  function handleEditClick() {
    setEditing(true);
  }

  if (isEditing) {
    return (
      <SimpleRowForm
        accountData={props.accountData}
        categoryData={props.categoryData}
        txn={props.txn}
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
