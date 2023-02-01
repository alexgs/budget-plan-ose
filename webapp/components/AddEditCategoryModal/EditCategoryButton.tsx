/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { CategoryValues } from '../../client-lib/types';
import { ApiSchema } from '../../shared-lib';

import { CategoryModal } from './CategoryModal';

interface Props {
  data: CategoryValues;
}

export const EditCategoryButton: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleButtonClick(): void {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: ApiSchema.NewCategory): void {
    void requestPatchCategory(props.data.id, values);
    setIsVisible(false);
  }

  async function requestPatchCategory(categoryId: string, values: ApiSchema.NewCategory) {
    const responseData = await fetch(`/api/categories/${categoryId}`, {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
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
      message: `Updated category "${responseData.name}"`,
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
    <div>
      <UnstyledButton onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faPencil} />
      </UnstyledButton>
      <Modal
        onClose={handleModalCancel}
        opened={isVisible}
        overlayBlur={3}
        title="Edit category"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
