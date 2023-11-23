/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { FC } from 'react';

import { api, buildCategoryTree, getCategoryList } from '../../client-lib';
import { NO_PARENT_CATEGORY, ApiSchema } from '../../shared-lib';

import { AddCategoryForm } from './AddCategoryForm';
import { CategoryPayload } from './types';

interface Props {
  data?: CategoryPayload;
  onCancel: VoidFunction;
  onSave: (values: ApiSchema.NewCategory) => void;
}

export const CategoryModal: FC<Props> = (props) => {
  const { error, categories: catData } = api.useAllCategories();
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
  menuItems.unshift({ label: 'None', value: NO_PARENT_CATEGORY });

  return (
    <AddCategoryForm
      categoryMenuItems={menuItems}
      data={props.data}
      onCancel={props.onCancel}
      onSave={props.onSave}
    />
  );
};
