import { InternalServerException } from "../exceptions/internal-server-exception";

export const badRequest = (error: Error) => {
    return{
        body: error,
        statusCode: 400
    }
}

export const ok = (body?: any) => {
    return{
        body,
        statusCode: 200
    }
};

export const serverError = () => {
    return {
        body: new InternalServerException(),
        statusCode: 500
    }
}