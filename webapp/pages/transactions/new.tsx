import { faDollarSign } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC } from 'react';

import { getCategoryList } from '../../client-lib';
import { Page } from '../../components';
import { prisma } from '../../server-lib';

// TODO Handle splitting transaction

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NewTransaction: FC<Props> = (props) => {
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
            data={props.accounts}
            label="Account"
            withAsterisk
          />
          <TextInput
            label="Description"
            placeholder="Payee or payer"
            withAsterisk
          />
          <NativeSelect
            data={props.categories}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const accountsTemp = await prisma.financialAccount.findMany();
  const accounts = accountsTemp.map(account => ({
    value: account.id,
    label: account.description,
  }));

  const categoriesTemp = await prisma.category.findMany();
  const categories = getCategoryList(categoriesTemp).map((cat) => ({
    value: cat.id,
    label: cat.label,
  }));

  return { props: { accounts, categories } }
}

export default NewTransaction;
