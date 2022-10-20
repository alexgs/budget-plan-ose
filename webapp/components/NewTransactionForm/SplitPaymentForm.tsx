/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faSplit } from '@fortawesome/pro-regular-svg-icons';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Group,
  NativeSelect,
  NumberInput,
  TextInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FC } from 'react';

interface Props {
  accounts: any[]; // TODO Fix type
  categories: any[]; // TODO Fix type
  mantineForm: any; // TODO Fix type
  onSplitClick: VoidFunction
}

export const SplitPaymentForm: FC<Props> = (props) => {
  function renderAmounts() {
    return props.mantineForm.values.amounts.map((amount: any, index: number) => (
      <div key={amount.id}>
        <NativeSelect
          data={props.accounts}
          label="Account"
          my="sm"
          required
          {...props.mantineForm.getInputProps('account')}
        />
        <NativeSelect
          data={props.categories}
          label="Category"
          my="sm"
          required
          {...props.mantineForm.getInputProps('category')}
        />
        <NumberInput
          decimalSeparator="."
          hideControls
          icon={<FontAwesomeIcon icon={faDollarSign} />}
          label="Amount"
          my="sm"
          precision={2}
          required
          {...props.mantineForm.getInputProps('amount')}
        />
        <Checkbox
          label="Credit or deposit"
          {...props.mantineForm.getInputProps('isCredit', { type: 'checkbox' })}
        />
      </div>
    ));
  }

  return (
    <form onSubmit={props.mantineForm.onSubmit((values: any) => console.log(values))}>
      <DatePicker
        allowFreeInput
        inputFormat="YYYY-MM-DD"
        label="Date"
        my="sm"
        required
        {
          // I really dislike this syntax; it's too much magic
          ...props.mantineForm.getInputProps('transactionDate')
        }
      />
      <NativeSelect
        data={[
          { value: 'payment', label: 'Payment' },
          { value: 'credit_card_charge', label: 'Credit card charge' },
          { value: 'account_transfer', label: 'Account transfer' },
        ]}
        label="Type"
        my="sm"
        required
        {...props.mantineForm.getInputProps('transactionType')}
      />
      <TextInput
        label="Description"
        placeholder="Payee or payer"
        my="sm"
        required
        {...props.mantineForm.getInputProps('description')}
      />
      <NumberInput
        decimalSeparator="."
        hideControls
        icon={<FontAwesomeIcon icon={faDollarSign} />}
        label="Total Amount"
        my="sm"
        precision={2}
        required
        {...props.mantineForm.getInputProps('amount')}
      />
      <Checkbox
        label="Credit or deposit"
        {...props.mantineForm.getInputProps('isCredit', { type: 'checkbox' })}
      />
      {renderAmounts()}
      <Group position="apart">
        <Group position="left" mt="md">
          <Button onClick={props.onSplitClick} variant="outline">
            <FontAwesomeIcon icon={faSplit} size="lg" />
          </Button>
        </Group>
        <Group position="right" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </Group>
    </form>

  );
}
