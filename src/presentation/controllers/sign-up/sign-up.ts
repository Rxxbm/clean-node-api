import { AddAccount } from "../../../domain/usecases/add-account";
import { InvalidParamException } from "../../exceptions/invalid-param-exceptions";
import { MissingParamException } from "../../exceptions/missing-param-exception";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { EmailValidator } from "../../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController implements Controller {
    constructor(private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount){}
    handle(httpRequest: HttpRequest): HttpResponse{
        try{
            const requireParams = ['name', 'email', 'password', 'password_confirmation'];
            for (const field of requireParams) {
                if (!httpRequest.body[field]) return badRequest(new MissingParamException(field));
            }
            const {email, password, password_confirmation, name} = httpRequest.body;
            if (password !== password_confirmation) 
                return badRequest(new InvalidParamException('password_confirmation'));
            const isValidEmail = this.emailValidator.isValid(email)
            if(!isValidEmail) 
                return badRequest(new InvalidParamException('email'));
            const account = this.addAccount.add({email, name, password});
            return ok(account);
        }catch{
            return serverError();
        }
       
    }
}