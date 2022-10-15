import { Button, Modal } from '@mantine/core';
import { FC, useState } from 'react';

import { AddCategoryModalContent } from './ModalContent';

export const AddCategory: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  function handleAddCategoryClick(): void {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: {}): void {
    setIsVisible(false);
  }

  function renderModalContent() {
    if (isVisible) {
      return (
        <AddCategoryModalContent
          onCancel={handleModalCancel}
          onSave={handleModalSave}
        />
      );
    }
    return null;
  }

  return (
    <>
      <div>
        <Button variant="outline" onClick={handleAddCategoryClick}>
          Add Category
        </Button>
        <Modal
          onClose={handleModalCancel}
          opened={isVisible}
          overlayBlur={3}
          title="Add new category"
        >
          {renderModalContent()}
        </Modal>
      </div>
    </>
  );
};
