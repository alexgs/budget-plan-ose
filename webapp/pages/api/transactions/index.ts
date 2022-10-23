/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { TransactionRecord, TransactionAmount } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { InferType, ValidationError } from 'yup';

import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server-lib';
import { newTransactionSchema } from '../../../shared-lib';

type NewTransactionSchema = InferType<typeof newTransactionSchema>;

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
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === 'GET') {
      const txns = await prisma.transactionRecord.findMany({
        include: { amounts: true },
      });
      const payload = txns.map((txn) => formatTransaction(txn));
      res.send(payload);
    } else if (req.method === 'POST') {
      // --- VALIDATE PAYLOAD ---

      let payload: NewTransactionSchema = {
        amounts: [
          {
            accountId: '',
            amount: 0,
            categoryId: '',
            isCredit: false,
            status: 'pending',
          },
        ],
        date: new Date(),
        description: '',
        type: 'payment',
      };
      try {
        payload = await newTransactionSchema.validate(req.body);
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
      // TODO Check that each `amount` item has a different category

      // --- BUSINESS LOGIC ---

      // TODO All of the DB updates in here should be wrapped in a single DB transaction

      const { amounts, ...record } = payload;

      // Update category balance for each amount
      await Promise.all(
        amounts.map((amount) => {
          const operation = amount.isCredit ? 'increment' : 'decrement';
          return prisma.category.update({
            where: { id: amount.categoryId },
            data: {
              balance: { [operation]: amount.amount },
            },
          });
        })
      );

      // Save transaction data and send response
      const newTransaction = await prisma.transactionRecord.create({
        data: {
          ...record,
          amounts: {
            createMany: {
              data: amounts,
            },
          },
        },
        include: { amounts: true },
      });
      res.send(formatTransaction(newTransaction));
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
