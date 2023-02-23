/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import { nextAuthOptions } from '../../../server-lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'PUT') {
      // --- VALIDATE PAYLOAD ---

      // TODO Validate with Yup schema
      let payload = req.body;

    } else {
      res.status(405).setHeader('Allow', 'PUT').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
