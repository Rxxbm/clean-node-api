import * as request from 'supertest';
import * as dotenv from 'dotenv';
import app from '../config/app';
import { MongoHelper } from 'infra/db/helpers/mongo-helper';

describe('SignUp Route', () => {
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
  }),

  test('Should return an account on success', async () => {
    await request(app).post('/api/sign-up')
    .send({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        password_confirmation: 'any_password'
    }).expect(200);
  });
});