import { Button } from '@mantine/core';
import { FC, useState } from 'react';

import { AddCategoryModal } from './Modal';

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

  function renderModal() {
    if (isVisible) {
      return (
        <AddCategoryModal
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
        {renderModal()}
      </div>
    </>
  );
};
