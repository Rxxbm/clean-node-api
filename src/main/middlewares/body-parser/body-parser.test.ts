import * as request from 'supertest';
import app from "../../config/app";

describe('Body Parser Middleware', () => {
    test('Should parse body as json', async () => {
        app.post('/test_body_parser', (req, res) => {
            res.json(req.body);
        });
        await request(app).post('/test_body_parser').send({ name: 'Rubem' }).expect({ name: 'Rubem' });
    });
});