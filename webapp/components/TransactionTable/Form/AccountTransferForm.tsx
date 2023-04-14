/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faCancel, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextInput, UnstyledButton } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';
import { NewTransactionFormHook } from '../../../client-lib/types';
import { Account, Category } from '../../../shared-lib';
import { AccountField } from '../Components/AccountField';
import {
  AccountCell, ButtonsCell,
  ChevronCell,
  DateCell,
  DescriptionCell
} from '../Components/Cell';
import { Row } from '../Components/Row';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  formOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  mantineForm: NewTransactionFormHook;
  onAccountChange: (accountId: string) => void;
  onCancel: VoidFunction;
}

export const AccountTransferForm: React.FC<Props> = (props) => {
  const key = 'new-account-transfer';
  return (
    <Row key={key}>
      <ChevronCell>{/* Checkbox */}</ChevronCell>
      <DateCell>
        <DatePicker
          allowFreeInput
          inputFormat="YYYY-MM-DD"
          required
          {...props.mantineForm.getInputProps('date')}
        />
      </DateCell>
      <AccountCell>
        <AccountField
          mantineForm={props.mantineForm}
          accountData={props.accountData}
          onAccountChange={props.onAccountChange}
        />
      </AccountCell>
      <DescriptionCell>
        <TextInput
          placeholder="Payee"
          required
          {...props.mantineForm.getInputProps('description')}
        />
      </DescriptionCell>
      <ButtonsCell>
        <UnstyledButton sx={{ marginLeft: '1rem' }} type="submit">
          <FontAwesomeIcon icon={faFloppyDisk} />
        </UnstyledButton>
        <UnstyledButton
          onClick={props.onCancel}
          sx={{ marginLeft: '1rem' }}
          type="button"
        >
          <FontAwesomeIcon icon={faCancel} />
        </UnstyledButton>
      </ButtonsCell>
    </Row>
  );
};
