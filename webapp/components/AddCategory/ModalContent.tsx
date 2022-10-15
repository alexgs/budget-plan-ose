import {
  Alert,
  Button,
  Group,
  Loader,
  NativeSelect,
  Space,
  TextInput
} from '@mantine/core';
import { useFormik } from 'formik';
import { FC } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';
import { getAllCategoryLabels } from '../../client-lib';

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

  const isCategoryNameTouched = formik.touched.categoryName;
  const isSaveButtonEnabled =
    Object.keys(formik.errors).length === 0 && isCategoryNameTouched;

  return (
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
          <Button color="pink.3" onClick={props.onCancel} variant="outline">
            Cancel
          </Button>
          <Button
            color="lime.4"
            disabled={!isSaveButtonEnabled}
            onClick={props.onSave}
            type="submit"
            variant="outline"
          >
            Save
          </Button>
        </Group>
      </form>
  );
};
