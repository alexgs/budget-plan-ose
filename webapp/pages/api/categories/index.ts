import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../server-lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const categories = await prisma.category.findMany();
    res.send(categories);
  } else {
    res.status(405);
    res.setHeader('Allow', 'GET');
    res.send('Method not allowed.');
  }
}
