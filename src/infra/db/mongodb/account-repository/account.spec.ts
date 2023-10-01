import * as dotenv from 'dotenv';
import { MongoHelper } from '../../helpers/mongo-helper';
import { AccountMongoRepository } from './account';

describe('Account Mongo Repository', () => {
    dotenv.config();

    beforeAll(async () => {
       await MongoHelper.connect(process.env.MONGO_URL as string);
    })
    
    afterAll(async () => {
        await MongoHelper.disconnect();
    })

    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    })

    const makeSut = () => {
        return new AccountMongoRepository();
    }

  test('Should returns an account on success', async () => {
    const sut = makeSut();
    const account = await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email');
    expect(account.password).toBe('any_password');
  });
});