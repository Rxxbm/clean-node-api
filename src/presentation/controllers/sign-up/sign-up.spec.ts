import { SignUpController } from "./sign-up";

describe('SignUp Controller', () => {
  test('Should returns 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
        body: {
            email: 'any_email',
            password: 'any_password',
            password_confirmation: 'any_password'
        }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});