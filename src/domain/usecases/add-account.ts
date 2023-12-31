import { AccountModel } from "../models/account-model";

export type AddAccountModel = {
    name: string;
    email: string;
    password: string;
};

export interface AddAccount {
    add(data: AddAccountModel): Promise<AccountModel>;
}