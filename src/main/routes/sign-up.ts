import { Request, Response, Router } from 'express';

export const SignUpRoute = (router: Router): void => {
    router.post('/sign-up', (req: Request, res: Response) => {
        res.send({ok: 'ok'});
    });
}