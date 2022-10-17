import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

const envVars = dotenv.config({ path: "../.env" });
dotenvExpand.expand(envVars);

import { PrismaClient } from "@prisma/client";

import categories from "./seed-data/categories.json" assert { type: 'json' };

const prisma = new PrismaClient();

async function seed() {
  return Promise.all(
    categories.map((data) => {
      return prisma.category.create({ data });
    })
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
