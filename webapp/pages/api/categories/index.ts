import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.send('Hello categories');
  } else {
    res.status(405);
    res.setHeader('Allow', 'GET');
    res.send('Method not allowed.');
  }
}
