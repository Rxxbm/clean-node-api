import { EmailValidatorAdapter } from "./email-validator-adapter";

describe('Email Validator Adapter', () => {
    test('Should returns true if email validator returns true', () => {
        const sut = new EmailValidatorAdapter();
        const response = sut.isValid('valid_email@mail.com');
        expect(response).toBe(true);
    });
  });
  