import { MissingParamException } from "../../exceptions/missing-param-exception";
import { badRequest, ok } from "../../helpers/http-helper";

export class SignUpController {
    handle(httpRequest: any): any{
        const requireParams = ['name', 'email', 'password'];
        for (const field of requireParams) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamException(field));
            }
        }
        return ok();
    }
}