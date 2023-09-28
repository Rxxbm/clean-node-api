export class InternalServerException extends Error {
    constructor(){
        super('Internal server error');
    }
}