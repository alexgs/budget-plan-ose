/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import React from 'react';
import { Page } from '../../components';

const ButtonContainer = styled.div({ marginLeft: '2rem' });

function AdminPage() {
  const [disableAll, setDisableAll] = React.useState(false);

  async function handleFixMissingReservationsClick() {
    setDisableAll(true);
    await fetch('/api/v2/admin/fix-missing-reservations', { method: 'POST' });
    setDisableAll(false);
  }

  async function handleReconcileClick() {
    setDisableAll(true);
    await fetch('/api/v2/admin/reconcile-all-transactions', { method: 'POST' });
    setDisableAll(false);
  }

  async function handleRemoveExtraCategoriesClick() {
    setDisableAll(true);
    await fetch('/api/v2/admin/remove-extra-category-subrecords', { method: 'POST' });
    setDisableAll(false);
  }

  return (
    <Page>
      <h1>Administration</h1>
      <div>
        <p>Fix credit card charges that are missing reservations.</p>
        <ButtonContainer>
          <Button
            disabled={disableAll}
            onClick={handleFixMissingReservationsClick}
          >
            Fix
          </Button>
        </ButtonContainer>
      </div>
      <div>
        <p>Reconcile all transactions.</p>
        <ButtonContainer>
          <Button disabled={disableAll} onClick={handleReconcileClick}>
            Reconcile
          </Button>
        </ButtonContainer>
      </div>
      <div>
        <p>Remove extraneous category subrecords (i.e. ones for $0).</p>
        <ButtonContainer>
          <Button
            disabled={disableAll}
            onClick={handleRemoveExtraCategoriesClick}
          >
            Remove
          </Button>
        </ButtonContainer>
      </div>
    </Page>
  );
}

export default AdminPage;
