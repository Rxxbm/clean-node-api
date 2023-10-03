import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeSignUpController } from '../factories/sign-up';

export const SignUpRoute = (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()));
}