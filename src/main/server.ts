import * as dotenv from 'dotenv';
import app from './config/app';
import env from './config/env';
import { MongoHelper } from '../infra/db/helpers/mongo-helper';
dotenv.config();
MongoHelper.connect(env.mongoUrl).then(() => {
    app.listen(env.port, () => {
        console.log('server running at http://localhost:5050');
    });
}).catch(console.error);