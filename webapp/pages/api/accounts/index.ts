/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { InferType, ValidationError } from 'yup';
import * as yup from 'yup';

import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server-lib';

const newAccountSchema = yup.object({
  accountType: yup.string().required(), // TODO This can be a more specific filter
  description: yup.string().required(),
});

type NewAccountSchema = InferType<typeof newAccountSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === 'GET') {
      const accounts = await prisma.financialAccount.findMany();
      res.send(accounts);
    } else if (req.method === 'POST') {
      let payload: NewAccountSchema = { accountType: '', description: '' };
      try {
        payload = await newAccountSchema.validate(req.body);
      } catch (e: any) {
        if (e.name && e.name === 'ValidationError') {
          const error: ValidationError = e as ValidationError;
          console.error(`>> POST /api/accounts 400 ${error.errors} <<`);
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

      const newAccount = await prisma.financialAccount.create({
        data: payload,
      });
      res.send(newAccount);
    } else {
      res.status(405).setHeader('Allow', 'GET POST').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
