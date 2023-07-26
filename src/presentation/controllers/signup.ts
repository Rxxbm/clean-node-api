import {HttpRequest, HttpResponse} from '../../protocols/http'
import {MissingParamsError} from '../errors/missinparamserror'
import {badRequest} from '../helpers/http.help'
export class SignUpController{
    handle (httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['email', 'name', 'password', 'password_confirmation']
        for (const field of requiredFields) {
            if(!httpRequest.body[field]){
                return badRequest(new MissingParamsError(field))
            }
        }
    }
}