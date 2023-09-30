import  * as bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt';

describe('Bcrypt Adapter', () => {
  test('Should calls bcrypt with correct values', () => {
    const salt:number = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});