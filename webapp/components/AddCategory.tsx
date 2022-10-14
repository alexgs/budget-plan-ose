import {
  Button,
  Group,
  Modal,
  NativeSelect,
  Space,
  TextInput,
} from '@mantine/core';
import { FC, useState } from 'react';
import useSWR from 'swr';

import { getAllCategoryLabels } from '../client-lib';

export const AddCategory: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentId, setParentId] = useState('');

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
        <TextInput
          label="Name"
          placeholder="Rainy day fund"
          onChange={(event) => setCategoryName(event.currentTarget.value)}
          value={categoryName}
          withAsterisk
        />
        <Space h="lg" />
        <NativeSelect
          data={parentCategories}
          label="Nest under"
          placeholder="None"
          onChange={(event) => setParentId(event.currentTarget.value)}
          value={parentId}
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
          <Button color="lime.4" onClick={handleSaveClick} variant="outline">
            Save
          </Button>
        </Group>
      </Modal>
      <div>
        <Button variant="outline" onClick={handleAddCategoryClick}>
          Add Category
        </Button>
      </div>
    </>
  );
};
