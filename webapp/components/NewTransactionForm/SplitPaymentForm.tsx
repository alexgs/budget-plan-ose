/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faSplit } from '@fortawesome/pro-regular-svg-icons';
import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  CSSObject,
  Group,
  MantineTheme,
  NativeSelect,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FC } from 'react';
import {
  NewTransactionFormHook,
  NewTransactionFormValues,
} from '../../client-lib/types';

// TODO This is good for me (who isn't colorblind), but we should add a '+' or
//   '-' prefix (or maybe some other FontAwesome icon) so there's another visual
//   indicator, too.

const amountStyle = (theme: MantineTheme): CSSObject => ({
  '.mantine-NumberInput-icon': { color: theme.colors.green[6] },
  input: { color: theme.colors.green[4] },
});

interface Props {
  accounts: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  mantineForm: NewTransactionFormHook;
  onSplitClick: VoidFunction;
  onSubmit: (values: NewTransactionFormValues) => void;
}

export const SplitPaymentForm: FC<Props> = (props) => {
  function sumAllocations(): number {
    const allocations = Object.values(props.mantineForm.values.amounts);
    return allocations.reduce((output, current) => output + current.amount, 0);
  }

  function renderAmounts() {
    return props.mantineForm.values.amounts.map((amount, index) => (
      <div key={`amount.${index}`}>
        <NativeSelect
          data={props.accounts}
          label="Account"
          my="sm"
          required
          {...props.mantineForm.getInputProps(`amounts.${index}.accountId`)}
        />
        <NativeSelect
          data={props.categories}
          label="Category"
          my="sm"
          required
          {...props.mantineForm.getInputProps(`amounts.${index}.categoryId`)}
        />
        <NumberInput
          decimalSeparator="."
          hideControls
          icon={<FontAwesomeIcon icon={faDollarSign} />}
          label="Amount"
          my="sm"
          precision={2}
          required
          sx={
            props.mantineForm.values.amounts[index].isCredit ? amountStyle : {}
          }
          {...props.mantineForm.getInputProps(`amounts.${index}.amount`)}
        />
        <Checkbox
          label="Credit or deposit"
          {...props.mantineForm.getInputProps(`amounts.${index}.isCredit`, {
            type: 'checkbox',
          })}
        />
      </div>
    ));
  }

  const amountRemaining = props.mantineForm.values.balance - sumAllocations();
  return (
    <form
      onSubmit={props.mantineForm.onSubmit(props.onSubmit, (values) =>
        console.error(values)
      )}
    >
      <DatePicker
        allowFreeInput
        inputFormat="YYYY-MM-DD"
        label="Date"
        my="sm"
        required
        {
          // I really dislike this syntax; it's too much magic
          ...props.mantineForm.getInputProps('date')
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
      <Group position="apart">
        <NumberInput
          decimalSeparator="."
          hideControls
          icon={<FontAwesomeIcon icon={faDollarSign} />}
          label="Total Amount"
          my="sm"
          precision={2}
          required
          style={{ width: '45%' }}
          sx={props.mantineForm.values.isCredit ? amountStyle : {}}
          {...props.mantineForm.getInputProps('balance')}
        />
        <NumberInput
          decimalSeparator="."
          disabled
          hideControls
          label="Amount Remaining"
          my="sm"
          precision={2}
          style={{ width: '45%' }}
          value={amountRemaining}
        />
      </Group>
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
};
