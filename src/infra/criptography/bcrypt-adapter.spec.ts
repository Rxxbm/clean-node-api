import  * as bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt';

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'));
  } 
}));

describe('Bcrypt Adapter', () => {
  test('Should calls bcrypt with correct values', async () => {
    const salt:number = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  test('Should returns a hash on sucess', async () => {
    const salt:number = 12;
    const sut = new BcryptAdapter(salt);
    const response = await sut.encrypt('any_value');
    expect(response).toEqual('hashed_value');
  });
});