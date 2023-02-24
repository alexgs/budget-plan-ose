/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Account, Category, sumSubrecords } from '../../shared-lib';
import { prisma, service } from '../index';

export async function reconcileAllTransactions() {
  // TODO All of the DB updates in here should be wrapped in a single DB transaction
  const accounts: Account[] = await service.getPublicAccounts();
  await Promise.all(
    accounts.map(async (account) => {
      const subrecords = await prisma.transactionAccount.findMany({
        where: { accountId: account.id },
      });
      const newBalance = sumSubrecords(subrecords);
      return prisma.financialAccount.update({
        where: { id: account.id },
        data: { balance: newBalance },
      });
    })
  );

  const categories: Category[] = await service.getPublicCategories();
  return Promise.all(
    categories.map(async (category) => {
      const subrecords = await prisma.transactionCategory.findMany({
        where: { categoryId: category.id },
      });
      const newBalance = sumSubrecords(subrecords);
      return prisma.category.update({
        where: { id: category.id },
        data: { balance: newBalance },
      });
    })
  );
}
