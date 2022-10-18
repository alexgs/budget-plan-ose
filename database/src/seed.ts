/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

const envVars = dotenv.config({ path: '../.env' });
dotenvExpand.expand(envVars);

import { PrismaClient } from '@prisma/client';

import categories from './seed-data/categories.json' assert { type: 'json' };
import financialAccounts from './seed-data/financial_accounts.json' assert { type: 'json' };
import users from './seed-data/users.json' assert { type: 'json' };
import userAccounts from './seed-data/user_accounts.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function upsertCategories() {
  return Promise.all(
    categories.map(async (data) => {
      const result = await prisma.category.findFirst({
        where: { id: data.id },
      });
      if (!result) {
        return prisma.category.create({ data });
      }
    })
  );
}

async function upsertFinancialAccounts() {
  return Promise.all(
    financialAccounts.map(async (data) => {
      const result = await prisma.financialAccount.findFirst({ where: { id: data.id } });
      if (!result) {
        return prisma.financialAccount.create({ data });
      }
    })
  );
}

async function upsertUsers() {
  return Promise.all(
    users.map(async (data) => {
      const result = await prisma.user.findFirst({ where: { id: data.id } });
      if (!result) {
        return prisma.user.create({ data });
      }
    })
  );
}

async function upsertUserAccounts() {
  return Promise.all(
    userAccounts.map(async (data) => {
      const result = await prisma.account.findFirst({ where: { id: data.id } });
      if (!result) {
        return prisma.account.create({ data });
      }
    })
  );
}

async function seed() {
  await upsertUsers();
  await upsertUserAccounts();
  await upsertCategories();
  await upsertFinancialAccounts();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
