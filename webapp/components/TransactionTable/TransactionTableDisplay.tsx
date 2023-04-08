/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import { UnstyledButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { api } from '../../client-lib/api';
import { txnToUpdateTxn } from '../../client-lib/txn-to-update-txn';
import {
  TRANSACTION_TYPES,
  Account,
  ApiSchema,
  Category,
} from '../../shared-lib';
import { space } from '../tokens';

import {
  AccountCell,
  AmountCell,
  ButtonsCell,
  CategoryCell,
  Cell,
  ChevronCell,
  DateCell,
  DescriptionCell,
  NotesCell,
} from './Components/Cell';
import { Row } from './Components/Row';

import { AccountTransferRow } from './Rows/AccountTransferRow';
import { CategoryTransferRow } from './Rows/CategoryTransferRow';
import { CreditCardChargeRow } from './Rows/CreditCardChargeRow';
import { SimpleRowDisplay } from './Rows/SimpleRowDisplay';
import { SimpleRowForm } from './Rows/SimpleRowForm';
import { SplitAccountRow } from './Rows/SplitAccountRow';
import { SplitCategoryRow } from './Rows/SplitCategoryRow';

const Table = styled.div({});

interface Props {
  accountData: Account[];
  accountId?: string;
  categoryData: Category[];
  txnData: ApiSchema.Transaction[];
}

export const TransactionTableDisplay: React.FC<Props> = (props) => {
  const [isNewTxnFormVisible, setNewTxnFormVisible] =
    React.useState<boolean>(false);
  const [nowEditing, setNowEditing] = React.useState<string | null>(null);

  function handleCancel() {
    setNewTxnFormVisible(false);
    setNowEditing(null);
  }

  function handleEditClick(recordId: string) {
    const data = props.txnData.find((txn) => txn.id === recordId);
    if (data) {
      if (data.type === TRANSACTION_TYPES.DEPOSIT) {
        // setModalVisible(true);
      }
      setNowEditing(recordId);
    } else {
      throw new Error(`Unable to find txn ID ${recordId}`);
    }
  }

  function handleSubmit(
    values: ApiSchema.NewTransaction | ApiSchema.UpdateTransaction
  ) {
    let promise: Promise<Response>;
    if ('id' in values) {
      const updateValues: ApiSchema.UpdateTransaction = values;
      promise = api.postExtantTransaction(updateValues);
    } else {
      const newValues: ApiSchema.NewTransaction = values;
      promise = api.postNewTransaction(newValues);
    }

    promise
      .then((response) => response.json())
      .then((json) => {
        showNotification({
          message: `Saved transaction "${json.description}"`,
          title: 'Success',
        });
      })
      .catch((e) => {
        console.error(e);
        showNotification({
          color: 'red',
          message: 'Something went wrong! Please check the logs.',
          title: 'Error',
        });
      })
      .finally(() => {
        setNewTxnFormVisible(false);
        setNowEditing(null);
      });
  }

  function renderRows() {
    return props.txnData.map((txn) => {
      // TODO Add a row-type for credit card payments

      if (txn.id === nowEditing) {
        const data = txnToUpdateTxn(txn);
        return (
          <SimpleRowForm
            accountData={props.accountData}
            categoryData={props.categoryData}
            data={data}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        );
      }

      if (txn.type === TRANSACTION_TYPES.CREDIT_CARD_CHARGE) {
        return (
          <CreditCardChargeRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.accounts.length === 1 && txn.categories.length > 1) {
        return (
          <SplitCategoryRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.accounts.length > 1 && txn.categories.length === 1) {
        return (
          <SplitAccountRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
        return (
          <AccountTransferRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      if (txn.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
        return (
          <CategoryTransferRow
            key={txn.id}
            accountData={props.accountData}
            categoryData={props.categoryData}
            txn={txn}
          />
        );
      }

      // Default option
      return (
        <SimpleRowDisplay
          key={txn.id}
          accountData={props.accountData}
          categoryData={props.categoryData}
          onEditClick={handleEditClick}
          txn={txn}
        />
      );
    });
  }

  function renderTopRow() {
    if (isNewTxnFormVisible) {
      return (
        <SimpleRowForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          accountData={props.accountData}
          categoryData={props.categoryData}
        />
      );
    }

    return (
      <Row>
        <Cell>
          <UnstyledButton
            onClick={() => setNewTxnFormVisible(true)}
            sx={(theme) => ({
              color: theme.colors.blue[6],
              fontWeight: 'bold',
              marginLeft: space.medium,
            })}
          >
            Add New Transaction
          </UnstyledButton>
        </Cell>
      </Row>
    );
  }

  return (
    <Table>
      <Row style={{ borderTop: 'none' }}>
        <ChevronCell>{/* Checkbox */}</ChevronCell>
        <DateCell>Date</DateCell>
        <AccountCell>Account</AccountCell>
        <DescriptionCell>Description</DescriptionCell>
        <CategoryCell>Category </CategoryCell>
        <NotesCell>Notes</NotesCell>
        <AmountCell>Amount</AmountCell>
        <ButtonsCell>{/* Buttons */}</ButtonsCell>
      </Row>
      {renderTopRow()}
      {renderRows()}
    </Table>
  );
};
