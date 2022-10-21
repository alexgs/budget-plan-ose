/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { InferType, ValidationError } from 'yup';

import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server-lib';
import { newTransactionSchema } from '../../../shared-lib';

type NewTransactionSchema = InferType<typeof newTransactionSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === 'POST') {
      let payload: NewTransactionSchema = {
        amounts: [
          {
            accountId: '',
            amount: 0,
            categoryId: '',
            id: '',
            isCredit: false,
            status: 'uncleared'
          },
        ],
        date: new Date(),
        description: '',
        id: '',
        type: '',
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
      const { amounts, ...record } = payload;
      const newTransaction = prisma.transactionRecord.create({
        data: {
          ...record,
          amounts: {
            createMany: {
              data: amounts,
            },
          },
        },
      });
      res.send(newTransaction);
    } else {
      res.status(405).setHeader('Allow', 'POST').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
