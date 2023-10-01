import { AddAccountRepository } from "../../../../data/repositories/add-acount-repository";
import { AccountModel } from "../../../../domain/models/account-model";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        const account = await accountCollection.findOne(result.insertedId);
        return MongoHelper.map(account);
        
        
    }
}