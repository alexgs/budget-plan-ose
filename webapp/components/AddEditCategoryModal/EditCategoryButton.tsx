/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import React from 'react';

import { ApiSchema } from '../../shared-lib';

import { CategoryModal } from './CategoryModal';

interface Props {}

export const EditCategoryButton: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleButtonClick(): void {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: ApiSchema.NewCategory): void {}

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
