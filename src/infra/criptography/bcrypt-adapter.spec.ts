import  * as bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt';

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'));
  } 
}));

const makeSut = () => {
  const salt:number = 12;
  const sut = new BcryptAdapter(salt);
  return{
    salt, 
    sut
  };
};

describe('Bcrypt Adapter', () => {
  test('Should calls bcrypt with correct values', async () => {
    const {sut, salt} = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  test('Should returns a hash on sucess', async () => {
    const {sut, salt} = makeSut();
    const response = await sut.encrypt('any_value');
    expect(response).toEqual('hashed_value');
  });
  test('Should throws if bcrypt throws', async () => {
    const {sut} = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {throw new Error()});
    const response = sut.encrypt('any_value');
    await expect(response).rejects.toThrow();
  });
});