import { MissingParamException } from "../../exceptions/missing-param-exception";
import { badRequest, ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse{
        const requireParams = ['name', 'email', 'password', 'password_confirmation'];
        for (const field of requireParams) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamException(field));
            }
        }
        return ok();
    }
}