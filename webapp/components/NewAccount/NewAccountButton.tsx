/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { AccountType } from '../../shared-lib/types';
import { NewAccountForm } from './NewAccountForm';

export interface NewAccountData { description: string, accountType: AccountType }

export const NewAccountButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  function handleNewAccountClick(): void {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: NewAccountData): void {
    void requestNewAccount(values.description, values.accountType);
    setIsVisible(false);
  }

  function renderModalContent() {
    if (isVisible) {
      return <NewAccountForm onCancel={handleModalCancel} onSave={handleModalSave} />;
    }
    return null;
  }

  async function requestNewAccount(description: string, accountType: AccountType) {
    const responseData = await fetch('/api/accounts', {
      body: JSON.stringify({
        accountType,
        description,
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
      message: `Saved new account "${responseData.description}"`,
      title: 'Success',
    });
  }

  return (
    <div>
      <Button variant="outline" onClick={handleNewAccountClick}>
        Add Account
      </Button>
      <Modal
        onClose={handleModalCancel}
        opened={isVisible}
        overlayBlur={3}
        title="Add new account"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
