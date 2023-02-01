/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDiagramSubtask } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { NO_PARENT_CATEGORY, ApiSchema } from '../../shared-lib';

import { CategoryModal } from './CategoryModal';

interface Props {
  parentId: string;
}

export const AddSubcategoryButton: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleButtonClick(): void {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: ApiSchema.NewCategory): void {
    void requestPostCategory(values);
    setIsVisible(false);
  }

  async function requestPostCategory(values: ApiSchema.NewCategory) {
    const responseData = await fetch(`/api/categories`, {
      body: JSON.stringify({
        name: values.name,
        parentId:
          values.parentId === NO_PARENT_CATEGORY ? null : values.parentId,
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
      message: `Updated category "${responseData.name}"`,
      title: 'Success',
    });
  }

  function renderModalContent() {
    if (isVisible) {
      return (
        <CategoryModal
          data={{ parentId: props.parentId }}
          onCancel={handleModalCancel}
          onSave={handleModalSave}
        />
      );
    }
    return null;
  }

  return (
    <div>
      <UnstyledButton onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faDiagramSubtask} />
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
