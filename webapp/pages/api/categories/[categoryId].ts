/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { ValidationError } from 'yup';
import * as yup from 'yup';

import { nextAuthOptions, service } from '../../../server-lib';
import { ApiSchema, schemaObjects } from '../../../shared-lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'PATCH') {
      let payload: ApiSchema.UpdateCategory = {
        name: '',
        parentId: null,
      };
      let categoryId = '';
      try {
        categoryId = await yup.string().required().validate(req.query.categoryId);
        payload = await schemaObjects.updateCategory.validate(req.body, {stripUnknown: false});
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

      const patchedCategory = await service.updateCategory(categoryId, payload);
      res.send(patchedCategory);
    } else {
      res.status(405).setHeader('Allow', 'PATCH').send('Method not allowed.');
    }
  } else {
    res.status(400).send('Bad request.');
  }
}
