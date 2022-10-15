import { Alert, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FC } from 'react';
import useSWR from 'swr';

import { getAllCategoryLabels } from '../../client-lib';

import { AddCategoryForm } from './AddCategoryForm';

interface Props {
  onClose: VoidFunction;
}

export const AddCategoryModalContent: FC<Props> = (props) => {
  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
    return (
      <Alert title="Error!" color="red">
        A network error occurred. Please check the console logs for details.
      </Alert>
    );
  }

  if (!catData) {
    return <Loader variant="bars" />;
  }

  const labels = getAllCategoryLabels(catData);
  const parentCategories = labels.map((cat) => ({
    label: cat.label,
    value: cat.id,
  }));
  parentCategories.unshift({ label: 'None', value: '' });

  function handleModalSave(values: { categoryName: string; parentId: string }) {
    alert(JSON.stringify(values, null, 2));
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
      parentCategories={parentCategories}
    />
  );
};
