import { Encrypter } from "../../data/protocols/encrypter";
import { hash } from 'bcrypt';
export class BcryptAdapter implements Encrypter {
    constructor(private readonly salt: number){}
    async encrypt(password: string): Promise<string> {
        await hash(password, this.salt);         
        return new Promise(resolve => resolve(''));
    }
}