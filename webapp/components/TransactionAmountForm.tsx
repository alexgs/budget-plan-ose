/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, NativeSelect, NumberInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { FC } from 'react';
import * as Yup from 'yup';

const formSchema = Yup.object({
  account: Yup.string().required(),
  amount: Yup.number().required(),
  category: Yup.string().required(),
});

interface Props {
  accounts: any[]; // TODO Fix type
  categories: any[]; // TODO Fix type
}

export const TransactionAmountForm: FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      account: props.accounts[0].value,
      amount: 0,
      category: props.categories[0].value,
      isCredit: false,
    },
    validate: yupResolver(formSchema),
    validateInputOnChange: true,
  });

  return (
    <div>
      <NativeSelect
        data={props.accounts}
        label="Account"
        my="sm"
        required
        {...form.getInputProps('account')}
      />
      <NativeSelect
        data={props.categories}
        label="Category"
        my="sm"
        required
        {...form.getInputProps('category')}
      />
      <NumberInput
        decimalSeparator="."
        hideControls
        icon={<FontAwesomeIcon icon={faDollarSign} />}
        label="Amount"
        my="sm"
        precision={2}
        required
        {...form.getInputProps('amount')}
      />
      <Checkbox
        label="Credit or deposit"
        {...form.getInputProps('isCredit', { type: 'checkbox' })}
      />
    </div>
  );
};
