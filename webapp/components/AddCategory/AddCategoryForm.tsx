import { Button, Group, NativeSelect, Space, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

interface Props {
  onCancel: VoidFunction;
  onSave: (values: {}) => void;
  parentCategories: { label: string, value: string }[];
}

export const AddCategoryForm: FC<Props> = (props) => {
  const formik = useFormik({
    initialValues: {
      categoryName: '',
      parentId: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      props.onSave(values);
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
        data={props.parentCategories}
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
          type="submit"
          variant="outline"
        >
          Save
        </Button>
      </Group>
    </form>
  );
};
