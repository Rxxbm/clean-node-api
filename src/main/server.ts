import * as dotenv from 'dotenv';
import app from './config/app';

dotenv.config();
app.listen(5050, () => {
    console.log('server running at http://localhost:5050');
});