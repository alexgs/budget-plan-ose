import {
  Button,
  Group,
  Modal,
  NativeSelect,
  Space,
  TextInput,
} from '@mantine/core';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';

import { getAllCategoryLabels } from '../../client-lib';

export const AddCategory: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  if (!catData) {
    return <div>Loading...</div>;
  }

  const labels = getAllCategoryLabels(catData);
  const parentCategories = labels.map((cat) => ({
    label: cat.label,
    value: cat.id,
  }));
  parentCategories.unshift({ label: 'None', value: '' });

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      parentId: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Required'),
    }),
  });

  function handleAddCategoryClick(): void {
    setIsVisible(true);
  }

  function handleSaveClick(): void {
    setIsVisible(false);
  }

  return (
    <>
      <Modal
        onClose={() => setIsVisible(false)}
        opened={isVisible}
        overlayBlur={3}
        title="Add new category"
      >
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.touched.categoryName && formik.errors.categoryName}
            id="categoryName"
            label="Name"
            name="categoryName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Rainy day fund"
            value={formik.values.categoryName}
            withAsterisk
          />
          <Space h="lg" />
          <NativeSelect
            id="parentId"
            data={parentCategories}
            label="Nest under"
            name="parentId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="None"
            value={formik.values.parentId}
          />
          <Space h="xl" />
          <Group position="apart">
            <Button
              color="pink.3"
              onClick={() => setIsVisible(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              color="lime.4"
              onClick={handleSaveClick}
              type="submit"
              variant="outline"
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
      <div>
        <Button variant="outline" onClick={handleAddCategoryClick}>
          Add Category
        </Button>
      </div>
    </>
  );
};
