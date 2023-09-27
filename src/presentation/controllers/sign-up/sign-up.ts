export class SignUpController {
    handle(httpRequest: any): any{
        const requireParams = ['name', 'email', 'password'];
        for (const field of requireParams) {
            if (!httpRequest.body[field]) {
                return {
                    statusCode: 400
                };
            }
        }
        return {
            statusCode: 200
        };
    }
}