/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Group, NativeSelect, Space, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import { ApiSchema, Category } from '../../shared-lib';

interface Props {
  categoryMenuItems: { label: string; value: string }[];
  data?: Category;
  onCancel: VoidFunction;
  onSave: (values: ApiSchema.NewCategory) => void;
}

export const AddCategoryForm: FC<Props> = (props) => {
  const formik = useFormik({
    initialValues: {
      name: props.data?.name ?? '',
      parentId: props.data?.parentId ?? '',
    },
    onSubmit: (values) => {
      props.onSave(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
  });

  const isSaveButtonEnabled = !formik.errors.name;

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        error={formik.touched.name && formik.errors.name}
        id="name"
        label="Name"
        name="name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder="Rainy day fund"
        value={formik.values.name}
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
