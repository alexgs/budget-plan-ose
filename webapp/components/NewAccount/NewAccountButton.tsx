/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { NewAccountForm } from './NewAccountForm';

export const NewAccountButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  function handleNewAccountClick(): void {
    setIsVisible(true);
  }

  function handleModalClose(): void {
    setIsVisible(false);
  }

  function renderModalContent() {
    if (isVisible) {
      return <NewAccountForm onClose={handleModalClose} />;
    }
    return null;
  }

  return (
    <div>
      <Button variant="outline" onClick={handleNewAccountClick}>
        Add Account
      </Button>
      <Modal
        onClose={handleModalClose}
        opened={isVisible}
        overlayBlur={3}
        title="Add new account"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
