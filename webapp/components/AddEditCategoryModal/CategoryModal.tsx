/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';

import { buildCategoryTree, getCategoryList } from '../../client-lib';
import { ApiSchema, Category } from '../../shared-lib';

import { AddCategoryForm } from './AddCategoryForm';

interface Props {
  data?: Category;
  onCancel: VoidFunction;
  onSave: (values: ApiSchema.NewCategory) => void;
}

export const CategoryModal: FC<Props> = (props) => {
  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
    return (
      <Alert
        icon={<FontAwesomeIcon icon={faCircleExclamation} />}
        title="Error!"
        color="red"
      >
        A network error occurred. Please check the console logs for details.
      </Alert>
    );
  }

  if (!catData) {
    return <Loader variant="bars" />;
  }

  const categories = getCategoryList(buildCategoryTree(catData));
  const menuItems = categories.map((cat) => ({
    label: cat.label,
    value: cat.id,
  }));
  menuItems.unshift({ label: 'None', value: '' });

  return (
    <AddCategoryForm
      onCancel={props.onCancel}
      onSave={props.onSave}
      categoryMenuItems={menuItems}
    />
  );
};
