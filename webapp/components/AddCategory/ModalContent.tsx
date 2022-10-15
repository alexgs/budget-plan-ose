import { Alert, Loader } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';

import { getAllCategoryLabels } from '../../client-lib';

import { AddCategoryForm } from './AddCategoryForm';

interface Props {
  onCancel: VoidFunction;
  onSave: (values: {}) => void;
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

  return (
    <AddCategoryForm
      onCancel={props.onCancel}
      onSave={props.onSave}
      parentCategories={parentCategories}
    />
  );
};
