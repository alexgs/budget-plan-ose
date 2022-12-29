/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { InferType, ValidationError } from 'yup';
import * as yup from 'yup';

import {
  ensureSystemCategories,
  nextAuthOptions,
  prisma,
} from '../../../server-lib';

const newCategorySchema = yup.object({
  name: yup.string().required(),
  parentId: yup.string().nullable(),
});

type NewCategorySchema = InferType<typeof newCategorySchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    if (req.method === 'GET') {
      const categories = await prisma.category.findMany();
      res.send(categories);
    } else if (req.method === 'POST') {
      let payload: NewCategorySchema = { name: '' };
      try {
        payload = await newCategorySchema.validate(req.body);
      } catch (e: any) {
        if (e.name && e.name === 'ValidationError') {
          const error: ValidationError = e as ValidationError;
          console.error(`>> POST /api/categories 400 ${error.errors} <<`);
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

      // TODO Use "repository" pattern to hide data access
      await ensureSystemCategories();
      const newCategory = await prisma.category.create({
        data: payload,
      });
      res.send(newCategory);
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
