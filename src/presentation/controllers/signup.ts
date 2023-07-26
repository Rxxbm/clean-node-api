import {HttpRequest, HttpResponse} from '../../protocols/http'
import {MissingParamsError} from '../errors/missinparamserror'
import {badRequest} from '../helpers/http.help'
export class SignUpController{
    handle (httpRequest: HttpRequest): HttpResponse {
        if(!httpRequest.body.name){
            return badRequest(new MissingParamsError("name"))
        }
        if(!httpRequest.body.email){
            return badRequest(new MissingParamsError("email"))
        }
    }
}