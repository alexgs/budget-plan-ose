import { Button, Modal, NativeSelect, Space } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { TextInputWithFloatingLabel } from './Inputs/TextInputWithFloatingLabel';

export const AddCategoryButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const parentCategories = [
    { label: 'None', value: '0' },
    { label: 'House', value: 'abc123' },
    { label: 'Groceries', value: 'abc124' },
  ];

  function handleClick(): void {
    setIsVisible(true);
  }

  return (
    <>
      <Modal
        onClose={() => setIsVisible(false)}
        opened={isVisible}
        overlayBlur={3}
        title="Add new category"
      >
        <Space h="xs" />
        <TextInputWithFloatingLabel
          label="Name"
          placeholder="Rainy day fund"
          onChange={setCategoryName}
          value={categoryName}
        />
        <Space h="lg" />
        <NativeSelect
          data={parentCategories}
          placeholder="Pick one"
          label="Nest under"
        />
      </Modal>
      <div>
        <Button variant="outline" onClick={handleClick}>
          Add Category
        </Button>
      </div>
    </>
  );
};
