/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { ValidationError } from 'yup';

import { database, nextAuthOptions, prisma } from '../../../server-lib';
import { schema } from '../../../shared-lib';
import { Schema } from '../../../shared-lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'GET') {
      const accounts = await prisma.financialAccount.findMany();
      res.send(accounts);
    } else if (req.method === 'POST') {
      let payload: Schema.NewAccount = { accountType: '', description: '' };
      try {
        payload = await schema.newAccount.validate(req.body);
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

      const newAccount = await database.createAccount(payload);
      res.send(newAccount);
    } else {
      res.status(405).setHeader('Allow', 'GET POST').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
