/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === 'GET') {
      const { categoryId } = req.query;
      res.send(`Hello category ${categoryId}`);
    } else {
      res.status(405).setHeader('Allow', 'GET').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
