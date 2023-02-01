/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Modal } from '@mantine/core';
import { FC, useState } from 'react';

import { AddCategoryModalContent } from './ModalContent';

export const AddCategoryButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  function handleAddCategoryClick(): void {
    setIsVisible(true);
  }

  function handleModalClose(): void {
    setIsVisible(false);
  }

  function renderModalContent() {
    if (isVisible) {
      return <AddCategoryModalContent onClose={handleModalClose} />;
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
          onClose={handleModalClose}
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
