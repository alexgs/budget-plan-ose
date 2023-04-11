/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import _ from 'lodash';
import { ApiSchema, Transaction } from '../../shared-lib';
import { database } from '../database';

export async function saveExtantTransaction(
  base: ApiSchema.UpdateTransactionBase,
  accountSubrecords: ApiSchema.UpdateTransaction['accounts'],
  categorySubrecords: ApiSchema.UpdateTransaction['categories']
): Promise<Transaction> {
  const modifiedAccountSubrecords: ApiSchema.UpdateAccountSubrecord[] =
    accountSubrecords.filter(
      (subrecord) => 'id' in subrecord
    ) as ApiSchema.UpdateAccountSubrecord[];
  const newAccountSubrecords: ApiSchema.NewAccountSubrecord[] =
    accountSubrecords.filter((subrecord) => !('id' in subrecord));

  const modifiedCategorySubrecords: ApiSchema.UpdateCategorySubrecord[] =
    categorySubrecords.filter(
      (subrecord) => 'id' in subrecord
    ) as ApiSchema.UpdateCategorySubrecord[];
  const newCategorySubrecords: ApiSchema.NewCategorySubrecord[] =
    categorySubrecords.filter((subrecord) => !('id' in subrecord));

  const extantTxn = await database.getTransaction(base.id);

  // Delete missing account subrecords
  const extantAccountSubrecordIds = extantTxn.accounts.map(
    (subrecord) => subrecord.id
  );
  const modifiedAccountSubrecordIds = modifiedAccountSubrecords.map(
    (subrecord) => subrecord.id
  );
  const accountSubrecordIdsToDelete = _.difference(
    extantAccountSubrecordIds,
    modifiedAccountSubrecordIds
  );
  await Promise.all(
    accountSubrecordIdsToDelete.map((id) => database.deleteAccountSubrecord(id))
  );

  // Delete missing category subrecords
  const extantCategorySubrecordIds = extantTxn.categories.map(
    (subrecord) => subrecord.id
  );
  const modifiedCategorySubrecordIds = modifiedCategorySubrecords.map(
    (subrecord) => subrecord.id
  );
  const categorySubrecordIdsToDelete = _.difference(
    extantCategorySubrecordIds,
    modifiedCategorySubrecordIds
  );
  await Promise.all(
    categorySubrecordIdsToDelete.map((id) =>
      database.deleteCategorySubrecord(id)
    )
  );

  // Update modified account subrecords
  await Promise.all(
    modifiedAccountSubrecords.map((subrecord) =>
      database.updateAccountSubrecord(subrecord)
    )
  );

  // Update modified category subrecords
  await Promise.all(
    modifiedCategorySubrecords.map((subrecord) =>
      database.updateCategorySubrecord(subrecord)
    )
  );

  // Save new account subrecords
  await Promise.all(
    newAccountSubrecords.map((subrecord) => database.saveNewAccountSubrecord(base.id, subrecord))
  )

  // Save new category subrecords
  await Promise.all(
    newCategorySubrecords.map((subrecord) => database.saveNewCategorySubrecord(base.id, subrecord))
  )

  return database.getTransaction(base.id);
}
