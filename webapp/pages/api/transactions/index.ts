/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { ValidationError } from 'yup';

import { nextAuthOptions, service } from '../../../server-lib';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  ApiSchema,
  Transaction,
  schemaObjects,
} from '../../../shared-lib';

function formatTransaction(txn: Transaction) {
  const utcDate = [
    txn.date.getUTCFullYear(),
    padTwoDigits(txn.date.getUTCMonth() + 1),
    padTwoDigits(txn.date.getUTCDate()),
  ].join('-');

  return {
    ...txn,
    date: utcDate,
  };
}

function padTwoDigits(x: number): string {
  return x.toString(10).padStart(2, '0');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'GET') {
      const txns = await service.getAllTransactions();
      const payload = txns.map((txn) => formatTransaction(txn));
      res.send(payload);
    } else if (req.method === 'POST') {
      // --- VALIDATE PAYLOAD ---

      let payload: ApiSchema.NewTransaction = {
        accounts: [
          {
            accountId: '',
            amount: 0,
            isCredit: false,
            status: AMOUNT_STATUS.PENDING,
          },
        ],
        categories: [
          {
            amount: 0,
            categoryId: '',
            isCredit: false,
          },
        ],
        date: new Date(),
        description: '',
        type: TRANSACTION_TYPES.PAYMENT,
      };
      try {
        // TODO Validate that the date is in YYYY-MM-DD format before converting to a `Date` object
        payload = await schemaObjects.newTransaction.validate(req.body);
      } catch (e: any) {
        if (e.name && e.name === 'ValidationError') {
          const error: ValidationError = e as ValidationError;
          console.error(`>> POST /api/transactions 400 ${error.errors} <<`);
          res
            .status(400)
            .send(
              'Error: payload failed validation. Please check server logs.'
            );
        } else {
          console.error(`>> Unknown error: ${e} <<`);
          res.status(500).send('Unknown error. Please check server logs.');
        }
        return;
      }

      const { errorMessage, isValidPayload } = service.validateTxnPayload(payload);
      if (!isValidPayload) {
        console.error(errorMessage);
        res
          .status(400)
          .send('Error: payload failed validation. Please check server logs.');
        return;
      }

      // --- BUSINESS LOGIC ---

      // TODO For payments and credit card charges, check that each `category` subrecord has a different category ID

      let result: Transaction | null = null;
      if (payload.type === TRANSACTION_TYPES.ACCOUNT_TRANSFER) {
        result = await service.processAccountTransfer(payload);
      }
      if (payload.type === TRANSACTION_TYPES.CATEGORY_TRANSFER) {
        result = await service.processCategoryTransfer(payload);
      }
      if (payload.type === TRANSACTION_TYPES.CREDIT_CARD_CHARGE) {
        result = await service.processCreditCardCharge(payload);
      }
      if (payload.type === TRANSACTION_TYPES.CREDIT_CARD_PAYMENT) {
        result = await service.processCreditCardPayment(payload);
      }
      if (payload.type === TRANSACTION_TYPES.PAYMENT) {
        result = await service.processPayment(payload);
      }

      if (result) {
        res.send(formatTransaction(result));
      } else {
        res.status(500).send(`Unknown transaction type: ${payload.type}`);
      }
    } else {
      res
        .status(405)
        .setHeader('Allow', 'GET POST')
        .send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
