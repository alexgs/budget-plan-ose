import { database } from './index';
import { prismaMock } from '../../prisma-mock';

describe('Function `database.deleteAccountSubrecord`', () => {
  it('calls the Prisma client with the provided subrecord ID', async () => {
    const subrecordId = '1234';

    await database.deleteAccountSubrecord(subrecordId);

    expect(prismaMock.transactionAccount.delete).toBeCalledTimes(1);
    expect(prismaMock.transactionAccount.delete).toBeCalledWith({ where: { id: subrecordId } });
  })
});
