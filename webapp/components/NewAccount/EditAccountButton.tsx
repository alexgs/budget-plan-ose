/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faPencil } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';

import { FinancialAccount } from '../../client-lib/types';
import { NewAccountData } from './NewAccountButton';
import { NewAccountForm } from './NewAccountForm';

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
      return <NewAccountForm data={props.data} onCancel={handleModalCancel} onSave={handleModalSave} />;
    }
    return null;
  }

  async function requestPatchAccount(accountId: string, values: NewAccountData) {}

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
