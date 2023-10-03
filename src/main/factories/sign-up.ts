import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { SignUpController } from "../../presentation/controllers/sign-up/sign-up";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";

const makeSignUpController = (): SignUpController => {
    const encrypterAdapter = new BcryptAdapter(12);
    const addAccountRepository = new AccountMongoRepository();
    const addAccount = new DbAddAccount(encrypterAdapter, addAccountRepository);
    const emailValidator = new EmailValidatorAdapter();
    return new SignUpController(emailValidator, addAccount);
}