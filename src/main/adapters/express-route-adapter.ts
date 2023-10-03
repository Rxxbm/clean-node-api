import { Controller } from "../../presentation/protocols/controller";
import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpResponse = await controller.handle(req);
        (httpResponse.statusCode == 200)?res.status(httpResponse.statusCode).json(httpResponse.body): res.status(httpResponse.statusCode).json({error: httpResponse.body.message});;
    }
}