/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { v5 as uuidV5 } from 'uuid';
import {
  sumSubrecords,
  TRANSACTION_TYPES,
  UUID_NAMESPACE,
} from '../../shared-lib';
import { getReservationCategoryId } from '../../shared-lib/get-reservation-category-id';
import { DbSchema } from '../../shared-lib/schema-v2/database-schema';
import { ModelSchema } from '../../shared-lib/schema-v2/model-schema';
import { prisma } from '../index';
import { service } from '../service-v2';

function hasReservationCategory(
  txn: DbSchema.Transaction,
  reservationCategoryId: string
): boolean {
  return txn.categories.some((cat) => cat.categoryId === reservationCategoryId);
}

export async function fixCreditCardCharges() {
  const accounts = await service.getPublicAccounts();

  // Get all credit card charges
  const txns = await prisma.transactionRecord.findMany({
    include: { accounts: true, categories: true },
    where: { type: TRANSACTION_TYPES.CREDIT_CARD_CHARGE },
    orderBy: [{ date: 'desc' }, { order: 'desc' }], // Newest transaction at the top
  });

  // Look at each charge and see if it has a reservation; if not, add one
  txns.forEach((txn) => {
    const account = accounts.find(
      (acct) => acct.id === txn.accounts[0].accountId
    );
    if (!account) {
      throw new Error(`Could not find account for transaction ${txn.id}`);
    }
    const reservationCategoryId = getReservationCategoryId(account);

    if (!hasReservationCategory(txn, reservationCategoryId)) {
      const chargeCategories = txn.categories.filter(
        (cat) => cat.categoryId !== reservationCategoryId
      );

      const reservationSubrecord = {
        amount: Math.abs(sumSubrecords(chargeCategories)),
        categoryId: reservationCategoryId,
        isCredit: true,
        recordId: txn.id,
      };
      prisma.transactionCategory.create({ data: reservationSubrecord });
    }
  });
}
