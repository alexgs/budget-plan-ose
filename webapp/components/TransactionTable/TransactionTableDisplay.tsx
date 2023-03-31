/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import styled from '@emotion/styled';
import React from 'react';

import {
  TRANSACTION_TYPES,
  Account,
  ApiSchema,
  Category,
} from '../../shared-lib';
import {
  AccountCell,
  AmountCell,
  ButtonsCell,
  CategoryCell,
  ChevronCell,
  DateCell,
  DescriptionCell,
  NotesCell,
} from './Components/Cell';
import { Row } from './Components/Row';

import { AccountTransferRow } from './Rows/AccountTransferRow';
import { CategoryTransferRow } from './Rows/CategoryTransferRow';
import { CreditCardChargeRow } from './Rows/CreditCardChargeRow';
import { SimpleRow } from './Rows/SimpleRow';
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
  function renderRows() {
    return props.txnData.map((txn) => {
      // TODO Add a row-type for credit card payments

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
        <SimpleRow
          key={txn.id}
          accountData={props.accountData}
          categoryData={props.categoryData}
          txn={txn}
        />
      );
    });
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

      {renderRows()}
    </Table>
  );
};
