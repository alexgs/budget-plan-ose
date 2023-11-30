/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { ZodError } from 'zod';
import { nextAuthOptions } from '../../../../server-lib';
import { service } from '../../../../server-lib/service-v2';
import { ApiSchema } from '../../../../shared-lib/schema-v2/api-schema';
import { Validators } from '../../../../shared-lib/schema-v2/validators';
import { transformers } from '../../../../shared-lib/transformers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (session) {
    if (req.method === 'GET') {
      const txns = await service.getAllTransactions(
        req.query.accountId as string
      );
      const payload = txns.map((txn) => transformers.txnModelToApi(txn));
      res.send(payload);
    } else if (req.method === 'POST') {
      try {
        const payload: ApiSchema.NewTransaction =
          Validators.NewTransaction.parse(req.body);
        const { errorMessage, isValidPayload } =
          service.validateTxnPayload(payload);
        if (!isValidPayload) {
          console.error(errorMessage);
          res
            .status(400)
            .send('Error: payload failed validation. Please check server logs.');
          return;
        }
        const txn = await service.createTransaction(payload);
        res.send(transformers.txnModelToApi(txn));
      } catch (e: unknown) {
        if (e instanceof ZodError) {
          res.status(400).send(e.message);
        } else if (e instanceof Error) {
          res.status(500).send(e.message);
        } else {
          throw e;
        }
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
