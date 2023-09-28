import { AccountModel } from "../../../domain/models/account-model";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { InternalServerException } from "../../exceptions/internal-server-exception";
import { InvalidParamException } from "../../exceptions/invalid-param-exceptions";
import { MissingParamException } from "../../exceptions/missing-param-exception";
import { EmailValidator } from "../../protocols/email-validator";
import { SignUpController } from "./sign-up";

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true;
  }
}

class AddAccountStub implements AddAccount {
  add(account: AddAccountModel): AccountModel {
    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };
  }
}

const makeSut = () => {
  const addAccountStub = new AddAccountStub();
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    emailValidatorStub,
    addAccountStub,
    sut
  }
}
describe('SignUp Controller', () => {
  test('Should returns 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
        body: {
            email: 'any_email',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('name'));
  });
  test('Should returns 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
        body: {
            name: 'any_name',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('email'));
  });
  test('Should returns 400 if no password is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'any_email',
            password_confirmation: 'any_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('password'));
  });
  test('Should returns 400 if no password_confirmation is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamException('password_confirmation'));
  });
  test('Should returns 400 if password_confirmation is invalid', () => {
    const { sut } = makeSut();
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            password_confirmation: 'invalid_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamException('password_confirmation'));
  });
  test('Should returns 400 if email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'invalid_email',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamException('email'));
  });
  test('Should returns an error if SignUpController calls EmailValidator with incorrect value', () => {
    const { sut, emailValidatorStub } = makeSut();
    const spy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'invalid_email',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    sut.handle(httpRequest);
    expect(spy).toHaveBeenCalledWith(httpRequest.body.email);
  });
  test('Should returns 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce( () => {
      throw new Error;
    });
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'invalid_email',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerException());
  });
  test('Should returns an error if SignUpController calls AddAccount with incorrect values', () => {
    const { sut, addAccountStub } = makeSut();
    const spy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
        body: {
            name: 'any_name',
            email: 'invalid_email',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    sut.handle(httpRequest);
    expect(spy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'invalid_email',
      password: 'any_password'
    });
  });
});
