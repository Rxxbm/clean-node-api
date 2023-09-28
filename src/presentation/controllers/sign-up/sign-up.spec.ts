import { InvalidParamException } from "../../exceptions/invalid-param-exceptions";
import { MissingParamException } from "../../exceptions/missing-param-exception";
import { EmailValidator } from "../../protocols/email-validator";
import { SignUpController } from "./sign-up";

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return true;
  }
}

describe('SignUp Controller', () => {
  test('Should returns 400 if no name is provided', () => {
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
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
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
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
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
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
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
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
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
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
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
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
});
