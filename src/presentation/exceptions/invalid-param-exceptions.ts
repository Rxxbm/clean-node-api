export class InvalidParamException extends Error {
    constructor(parameter: string){
        super(`Invalid parameter: ${parameter}`);
    }
}
