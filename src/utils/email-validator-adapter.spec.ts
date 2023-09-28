import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from 'validator';

describe('Email Validator Adapter', () => {
    test('Should returns true if email validator returns true', () => {
        const sut = new EmailValidatorAdapter();
        const isValid = sut.isValid('valid_email@mail.com');
        expect(isValid).toBe(true);
    });
    test('Should returns false if email validator returns false', () => {
        const sut = new EmailValidatorAdapter();
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
        const isValid = sut.isValid('valid_email@mail.com');
        expect(isValid).toBe(false);
    });
  });
  