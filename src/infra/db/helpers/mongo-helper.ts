import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

export const MongoHelper = {
    client: null as unknown as MongoClient,

    async connect (url: string) {
        this.client = await MongoClient.connect(url);
    },

    async disconnect () {
        await this.client.close();
    }
}