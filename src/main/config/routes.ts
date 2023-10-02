import { Express, Router} from 'express';
import { SignUpRoute } from '../routes/sign-up';

export const setupRoutes = (app: Express): void => {
    const router = Router();
    app.use('/api', router);
    SignUpRoute(router);
}