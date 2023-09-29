import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

class EncrypterStub implements Encrypter {
    encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
    }
}
describe('DbAddAccount Usecase', () => {
  test('Should call encrypter with correct password', () => {
    const encryptStub = new EncrypterStub()
    const sut = new DbAddAccount(encryptStub);
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt');
    const accountData = {
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
    }
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});