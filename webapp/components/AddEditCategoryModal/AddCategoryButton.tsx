/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { NO_PARENT_CATEGORY, ApiSchema } from '../../shared-lib';

import { CategoryModal } from './CategoryModal';

export const AddCategoryButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleAddCategoryClick(): void {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: ApiSchema.NewCategory): void {
    void requestNewCategory(values.name, values.parentId ?? '');
    setIsVisible(false);
  }

  async function requestNewCategory(name: string, parentId: string) {
    const responseData = await fetch('/api/categories', {
      body: JSON.stringify({
        name,
        parentId: parentId === NO_PARENT_CATEGORY ? null : parentId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .catch((e) => {
        console.error(e);
        showNotification({
          color: 'red',
          message: 'Something went wrong! Please check the logs.',
          title: 'Error',
        });
      });

    showNotification({
      message: `Saved new category "${responseData.name}"`,
      title: 'Success',
    });
  }

  function renderModalContent() {
    if (isVisible) {
      return (
        <CategoryModal onCancel={handleModalCancel} onSave={handleModalSave} />
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
