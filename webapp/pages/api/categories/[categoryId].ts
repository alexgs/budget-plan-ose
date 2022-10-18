import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { categoryId } = req.query;
    res.send(`Hello category ${categoryId}`);
  } else {
    res.status(405);
    res.setHeader('Allow', 'GET');
    res.send('Method not allowed.');
  }
}
