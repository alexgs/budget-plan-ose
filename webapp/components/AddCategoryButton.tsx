import { Button, Modal, Space } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { TextInputWithFloatingLabel } from './Inputs/TextInputWithFloatingLabel';

export const AddCategoryButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

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
      </Modal>
      <div>
        <Button variant="outline" onClick={handleClick}>
          Add Category
        </Button>
      </div>
    </>
  );
};
