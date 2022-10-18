/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Group, NativeSelect, Space, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

interface Props {
  onCancel: VoidFunction;
  onSave: (values: {categoryName: string, parentId: string}) => void;
  categoryMenuItems: { label: string, value: string }[];
}

export const AddCategoryForm: FC<Props> = (props) => {
  const formik = useFormik({
    initialValues: {
      categoryName: '',
      parentId: '',
    },
    onSubmit: (values) => {
      props.onSave(values);
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Required'),
    }),
  });

  const isSaveButtonEnabled = !formik.errors.categoryName;

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
        data={props.categoryMenuItems}
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
