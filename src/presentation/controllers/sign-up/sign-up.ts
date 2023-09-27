export class SignUpController {
    handle(httpRequest: any): any{
        const requireParams = ['name', 'email', 'password'];
        for (const field of requireParams) {
            if (!httpRequest.body[field]) {
                return {
                    body: new Error(`missing param: ${field}`),
                    statusCode: 400
                };
            }
        }
        return {
            statusCode: 200
        };
    }
}