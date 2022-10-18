import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { FC } from 'react';
import { Page } from '../../components';

// TODO Handle splitting transaction

const NewTransaction: FC = () => {
  return (
    <Page>
      <h1>Budget Plan</h1>
      <div>
        <form>
          <TextInput label="Date" withAsterisk />
          <NativeSelect
            data={[
              { value: 'payment', label: 'Payment' },
              { value: 'credit_card_charge', label: 'Credit card charge' },
              { value: 'account_transfer', label: 'Account transfer' },
            ]}
            label="Type"
            withAsterisk
          />
          <NativeSelect
            data={[
              /* TODO Add accounts to DB and build menu from there */
              { value: '101', label: 'WF checking' },
              { value: '102', label: 'Credit union checking' },
              { value: '103', label: 'WF credit card' },
            ]}
            label="Account"
            withAsterisk
          />
          <TextInput
            label="Description"
            placeholder="Payee or payer"
            withAsterisk
          />
          <NativeSelect
            data={[
              /* TODO Connect to DB */
            ]}
            label="Category"
            withAsterisk
          />
          <NumberInput
            decimalSeparator="."
            hideControls
            icon={<FontAwesomeIcon icon={faDollarSign} />}
            label="Amount"
            precision={2}
            my="sm"
          />
          <Checkbox label="Credit or deposit" />
        </form>
      </div>
    </Page>
  );
};

export default NewTransaction;
