import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { InferType, ValidationError } from 'yup';
import * as yup from 'yup';

import { nextAuthOptions, prisma } from '../../../server-lib';

const patchAccountSchema = yup.object({
  accountType: yup.string(), // TODO This can be a more specific filter
  description: yup.string(),
});

type PatchAccountSchema = InferType<typeof patchAccountSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'PATCH') {
      let payload: PatchAccountSchema = {
        accountType: '',
        description: '',
      };
      let accountId = '';
      try {
        accountId = await yup.string().required().validate(req.query.accountId);
        payload = await patchAccountSchema.validate(req.body, {stripUnknown: false});
      } catch (e: any) {
        if (e.name && e.name === 'ValidationError') {
          const error: ValidationError = e as ValidationError;
          console.error(`>> POST /api/accounts/:id 400 ${error.errors} <<`);
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

      // TODO Handler should only call service layer
      const patchedAccount = await prisma.financialAccount.update({
        where: { id: accountId },
        data: {
          accountType: payload.accountType,
          description: payload.description,
        },
      });
      res.send(patchedAccount);
    } else {
      res.status(405).setHeader('Allow', 'PATCH').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
