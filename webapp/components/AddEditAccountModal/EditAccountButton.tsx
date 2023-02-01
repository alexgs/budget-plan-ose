/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';

import { FinancialAccount } from '../../client-lib/types';

import { AccountModal } from './AccountModal';
import { NewAccountData } from './NewAccountButton';

interface Props {
  data: FinancialAccount;
}

export const EditAccountButton: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleEditAccountClick() {
    setIsVisible(true);
  }

  function handleModalCancel(): void {
    setIsVisible(false);
  }

  function handleModalSave(values: NewAccountData): void {
    void requestPatchAccount(props.data.id, values);
    setIsVisible(false);
  }

  function renderModalContent() {
    if (isVisible) {
      return <AccountModal data={props.data} onCancel={handleModalCancel} onSave={handleModalSave} />;
    }
    return null;
  }

  async function requestPatchAccount(accountId: string, values: NewAccountData) {
    const responseData = await fetch(`/api/accounts/${accountId}`, {
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
      message: `Updated account "${responseData.description}"`,
      title: 'Success',
    });
  }

  return (
    <div>
      <UnstyledButton onClick={handleEditAccountClick}>
        <FontAwesomeIcon icon={faPencil} />
      </UnstyledButton>
      <Modal
        onClose={handleModalCancel}
        opened={isVisible}
        overlayBlur={3}
        title="Edit account"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
