/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDiagramSubtask } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import React from 'react';

import { ApiSchema } from '../../shared-lib';

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

  function requestPostCategory(values: ApiSchema.NewCategory) {}

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
