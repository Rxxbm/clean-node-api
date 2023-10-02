import * as request from 'supertest';
import app from '../config/app';

describe('SignUp Route', () => {
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