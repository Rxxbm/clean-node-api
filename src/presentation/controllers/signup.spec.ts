import {SignUpController} from './signup'
import {MissingParamsError} from '../errors/missinparamserror'
describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController() //system under test
        const httpRequest = {
            body:{
                email: "any_email",
                password: "any_password",
                password_confirmation: "any_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError("name"))
    })
    test('Should return 400 if no email is provided', () => {
        const sut = new SignUpController() //system under test
        const httpRequest = {
            body:{
                name: "any_name",
                password: "any_password",
                password_confirmation: "any_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError("email"))
    })
    test('Should return 400 if no password is provided', () => {
        const sut = new SignUpController() //system under test
        const httpRequest = {
            body:{
                name: "any_name",
                email: "any_email",
                password_confirmation: "any_password"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError("password"))
    })
    test('Should return 400 if no password_confirmation is provided', () => {
        const sut = new SignUpController() //system under test
        const httpRequest = {
            body:{
                name: "any_name",
                email: "any_email",
                password: "any_password",
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamsError("password_confirmation"))
    })
})