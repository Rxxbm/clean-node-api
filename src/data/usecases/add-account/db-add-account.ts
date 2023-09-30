import { AccountModel } from "../../../domain/models/account-model";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";
import { AddAccountRepository } from "../../repositories/add-acount-repository";

export class DbAddAccount implements AddAccount {
    constructor(private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository){}
    async add(data: AddAccountModel): Promise<AccountModel> {
        const hashed_password = await this.encrypter.encrypt(data.password);
        const account_with_hashed_password: AddAccountModel = {
            ...data,
            password: hashed_password
        }
        const account = await this.addAccountRepository.add(account_with_hashed_password);
        return account;
    }
}