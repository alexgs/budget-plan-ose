import {
  Button,
  Group,
  Modal,
  NativeSelect,
  Space,
  TextInput,
} from '@mantine/core';
import { FC, useState } from 'react';

export const AddCategoryButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentId, setParentId] = useState('');

  const parentCategories = [
    { label: 'None', value: '' },
    { label: 'House', value: 'abc123' },
    { label: 'Groceries', value: 'abc124' },
  ];

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
