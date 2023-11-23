/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { nextAuthOptions } from '../../../../server-lib';
import { service } from '../../../../server-lib/service-v2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (session) {
    if (req.method === 'POST') {
      await service.reconcileAllTransactions();
      // @ts-ignore -- This is valid for a 204 response
      res.status(204).send();
    } else {
      res.status(405).setHeader('Allow', 'POST').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
