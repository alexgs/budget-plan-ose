import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

const envVars = dotenv.config({ path: '../.env' });
dotenvExpand.expand(envVars);

import { PrismaClient } from '@prisma/client';

import categories from './seed-data/categories.json' assert { type: 'json' };
import users from './seed-data/users.json' assert { type: 'json' };
import userAccounts from './seed-data/user_accounts.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function createCategories() {
  return Promise.all(
    categories.map((data) => {
      return prisma.category.create({ data });
    })
  );
}

async function upsertUsers() {
  return Promise.all(
    users.map((data) => {
      return prisma.user.upsert({
        where: { id: data.id },
        create: data,
        update: data,
      });
    })
  );
}

async function upsertUserAccounts() {
  return Promise.all(
    userAccounts.map((data) => {
      return prisma.account.upsert({
        where: { id: data.id },
        create: data,
        update: data,
      });
    })
  );
}

async function seed() {
  await upsertUsers();
  await upsertUserAccounts();
  await createCategories();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
