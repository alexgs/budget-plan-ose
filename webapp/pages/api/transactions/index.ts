/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { ValidationError } from 'yup';

import {
  formatTransaction,
  nextAuthOptions,
  service,
} from '../../../server-lib';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  ApiSchema,
  Transaction,
  schemaObjects,
} from '../../../shared-lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'GET') {
      const txns = await service.getAllTransactions(req.query.accountId as string);
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

      const { errorMessage, isValidPayload } =
        service.validateTxnPayload(payload);
      if (!isValidPayload) {
        console.error(errorMessage);
        res
          .status(400)
          .send('Error: payload failed validation. Please check server logs.');
        return;
      }

      // --- BUSINESS LOGIC ---

      // TODO For payments and credit card charges, check that each `category` subrecord has a different category ID

      let result: Transaction | null = await service.processTransaction(payload);
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
