/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TransactionAmount, TransactionRecord } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { ValidationError } from 'yup';

import { nextAuthOptions, prisma, service } from '../../../server-lib';
import {
  AMOUNT_STATUS,
  TRANSACTION_TYPES,
  ApiSchema,
  schemaObjects,
} from '../../../shared-lib';

function formatTransaction(
  txn: TransactionRecord & { amounts: TransactionAmount[] }
) {
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
      const txns = await prisma.transactionRecord.findMany({
        include: { amounts: true },
      });
      const payload = txns.map((txn) => formatTransaction(txn));
      res.send(payload);
    } else if (req.method === 'POST') {
      // --- VALIDATE PAYLOAD ---

      let payload: ApiSchema.NewTransaction = {
        amounts: [
          {
            accountId: '',
            amount: 0,
            categoryId: '',
            isCredit: false,
            status: AMOUNT_STATUS.PENDING,
          },
        ],
        date: new Date(),
        description: '',
        type: TRANSACTION_TYPES.PAYMENT,
      };
      try {
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

      if (payload.amounts?.length === 0) {
        console.error(
          '>> POST /api/transactions 400 Field `payload.amounts` must contain at least item. <<'
        );
        res
          .status(400)
          .send('Error: payload failed validation. Please check server logs.');
      }

      // --- BUSINESS LOGIC ---

      // TODO Set category and description for transfers
      // TODO Don't let the `amount.notes` field be undefined; it should be defined or null
      // TODO For payments, check that each `amount` item has a different category

      let result: TransactionRecord & {amounts: TransactionAmount[]} | null = null;
      if (payload.type === TRANSACTION_TYPES.PAYMENT) {
        result = await service.processPayment(payload);
      }

      if (result) {
        res.send(formatTransaction(result));
      } else {
        res.status(500).send(`Unknown transaction type: ${payload.type}`)
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
