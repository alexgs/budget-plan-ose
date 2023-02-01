/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FC } from 'react';
import useSWR from 'swr';

import { buildCategoryTree, getCategoryList } from '../../client-lib';

import { AddCategoryForm } from './AddCategoryForm';

interface Props {
  onClose: VoidFunction;
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

  function handleModalSave(values: { categoryName: string; parentId: string }) {
    void requestNewCategory(values.categoryName, values.parentId);
    props.onClose();
  }

  async function requestNewCategory(categoryName: string, parentId: string) {
    const responseData = await fetch('/api/categories', {
      body: JSON.stringify({
        name: categoryName,
        parentId: parentId.length === 0 ? null : parentId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .catch((e) => {
        console.error(e);
        showNotification({
          color: 'red',
          message: 'Something went wrong! Please check the logs.',
          title: 'Error',
        });
      });

    showNotification({
      message: `Saved new category "${responseData.name}"`,
      title: 'Success',
    });
  }

  return (
    <AddCategoryForm
      onCancel={props.onClose}
      onSave={handleModalSave}
      categoryMenuItems={menuItems}
    />
  );
};
