import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { InferType } from 'yup';
import * as yup from 'yup';

import { nextAuthOptions } from '../../../server-lib';

const patchAccountSchema = yup.object({
  accountType: yup.string().nullable(), // TODO This can be a more specific filter
  description: yup.string().nullable(),
  id: yup.string().required(),
});

type PatchAccountSchema = InferType<typeof patchAccountSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'PATCH') {
      // TODO
    } else {
      res.status(405).setHeader('Allow', 'PATCH').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
