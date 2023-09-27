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