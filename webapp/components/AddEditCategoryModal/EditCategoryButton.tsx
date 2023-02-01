/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import React from 'react';
import { CategoryModal } from './CategoryModal';

interface Props {}

export const EditCategoryButton: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  function handleButtonClick(): void {
    setIsVisible(true);
  }

  function handleModalClose(): void {
    setIsVisible(false);
  }

  function renderModalContent() {
    if (isVisible) {
      return <CategoryModal onClose={handleModalClose} />;
    }
    return null;
  }

  return (
    <div>
      <UnstyledButton onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faPencil} />
      </UnstyledButton>
      <Modal
        onClose={handleModalClose}
        opened={isVisible}
        overlayBlur={3}
        title="Edit category"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
