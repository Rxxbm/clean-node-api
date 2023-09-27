export class MissingParamException extends Error {
    constructor(parameter: string){
        super(`Missing aram: ${parameter}`);
    }
}