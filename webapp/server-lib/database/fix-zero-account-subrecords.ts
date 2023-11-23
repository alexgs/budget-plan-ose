/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { TRANSACTION_TYPES, getReservationCategoryId } from '../../shared-lib';
import { prisma } from '../index';
import { service } from '../service-v2';

export async function fixZeroAccountSubrecords() {
  const accounts = await service.getPublicAccounts();

  // Get all credit card charges
  const txns = await prisma.transactionRecord.findMany({
    include: { accounts: true, categories: true },
    where: { type: TRANSACTION_TYPES.CREDIT_CARD_CHARGE },
    orderBy: [{ date: 'desc' }, { order: 'desc' }], // Newest transaction at the top
  });

  // Look at each charge and see if it has a $0 account subrecord; if so, fix it
  for (let i = 0; i < txns.length; i++) {
    const txn = txns[i];
    const accountSubrecord = txn.accounts[0];
    if (accountSubrecord.amount === 0) {
      // Get the reservation category ID
      const account = accounts.find(
        (acct) => acct.id === txn.accounts[0].accountId
      );
      if (!account) {
        throw new Error(`Could not find account for transaction ${txn.id}`);
      }
      const reservationCategoryId = getReservationCategoryId(account);

      // Get the reservation subrecord
      const reservationSubrecord = txn.categories.find(
        (cat) => cat.categoryId === reservationCategoryId
      );
      if (!reservationSubrecord) {
        throw new Error(
          `Could not find reservation subrecord for transaction ${txn.id}`
        );
      }

      // Update the account subrecord
      await prisma.transactionAccount.update({
        where: { id: accountSubrecord.id },
        data: { amount: reservationSubrecord.amount },
      });
    }
  }
}
