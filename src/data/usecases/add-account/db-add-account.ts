import { AccountModel } from "../../../domain/models/account-model";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";
import { AddAccountRepository } from "../../repositories/add-acount-repository";

export class DbAddAccount implements AddAccount {
    constructor(private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository){}
    async add(data: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(data.password);
        await this.addAccountRepository.add(data);
        return new Promise(resolve => resolve(null));
    }
}