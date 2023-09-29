import { AccountModel } from "../../../domain/models/account-model";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccount {
    constructor(private readonly encrypter: Encrypter){}
    async add(data: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(data.password);
        return new Promise(resolve => resolve(null));
    }
}