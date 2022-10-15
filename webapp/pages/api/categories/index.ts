import type { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';
import { InferType, ValidationError } from 'yup';
import * as yup from 'yup';

import { prisma } from '../../../server-lib';

// TODO Add auth

const newCategorySchema = yup.object({
  name: yup.string().required(),
  parentId: yup.string(),
});

type NewCategorySchema = InferType<typeof newCategorySchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
          .send('Error: payload failed validation. Please check server logs.');
      } else {
        console.error(`>> Unknown error: ${e} <<`);
        res.status(500).send('Unknown error. Please check server logs.');
      }
      return;
    }

    const newCategory = await prisma.category.create({
      data: {
        ...payload,
        slug: slug(payload.name),
      },
    });
    res.send(newCategory);
  } else {
    res.status(405).setHeader('Allow', 'GET POST').send('Method not allowed.');
  }
}
