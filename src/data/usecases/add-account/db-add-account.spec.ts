import { AccountModel } from "../../../domain/models/account-model";
import { AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";
import { AddAccountRepository } from "../../repositories/add-acount-repository";
import { DbAddAccount } from "./db-add-account";

class EncrypterStub implements Encrypter {
    encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
    }
}
class AddAccountRepositoryStub implements AddAccountRepository{
   async add(accountData: AddAccountModel): Promise<AccountModel> {
    const fakeAccount: AccountModel = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }; 
    return new Promise(resolve => resolve(fakeAccount));
   }
}
const makeSut = () => {
  const encrypterStub = new EncrypterStub();
  const addAccountRepositoryStub = new AddAccountRepositoryStub();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return{
    sut, 
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call encrypter with correct password', async () => {
    const {sut, encrypterStub} = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
    }
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
  test('Should throws if Encrypter throws', async () => {
    const {sut, encrypterStub} = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {throw new Error()});
    const accountData = {
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
    }
    const response = sut.add(accountData);
    await expect(response).rejects.toThrow();
  });
  test('Should calls AddAccountRepository with correct values', async () => {
    const {sut, addAccountRepositoryStub} = makeSut();
    const spyAdd = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
    }
    await sut.add(accountData);
    expect(spyAdd).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    });
  });
});