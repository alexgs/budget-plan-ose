/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faCancel, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumberInput, UnstyledButton } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';

import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../../client-lib/types';
import { Account, Category } from '../../../shared-lib';
import { AccountField } from '../Components/AccountField';
import {
  AccountCell,
  AmountCell,
  ButtonsCell,
  Cell,
  ChevronCell,
  DateCell,
} from '../Components/Cell';
import { Row } from '../Components/Row';

interface Props {
  accountData: Account[];
  categoryData: Category[];
  mantineForm: NewTransactionFormHook;
  onAccountChange: (accountId: string) => void;
  onSubmit: (values: NewTransactionFormValues) => void;
  onCancel: VoidFunction;
}

export const AccountTransferForm: React.FC<Props> = (props) => {
  const key = 'new-account-transfer';
  return (
    <form
      onSubmit={props.mantineForm.onSubmit(props.onSubmit, (values) =>
        console.error(values)
      )}
    >
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
        <AccountCell>Account transfer</AccountCell>
        <Cell style={{ display: 'flex', alignItems: 'center' }}>
          From:{' '}
          <AccountField
            accountData={props.accountData}
            enableTransferOptions={false}
            index={0}
            mantineForm={props.mantineForm}
          />
        </Cell>
        <Cell style={{ display: 'flex', alignItems: 'center' }}>
          To:{' '}
          <AccountField
            accountData={props.accountData}
            enableTransferOptions={false}
            index={1}
            mantineForm={props.mantineForm}
          />
        </Cell>
        <AmountCell style={{ display: 'flex', alignItems: 'center' }}>
          <NumberInput
            decimalSeparator="."
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            precision={2}
            required
            {...props.mantineForm.getInputProps(`accounts.0.amount`)}
          />
        </AmountCell>
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
    </form>
  );
};
