import { MongoClient, Collection } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

export const MongoHelper = {
    client: null as unknown as MongoClient,

    async connect (url: string) {
        this.client = await MongoClient.connect(url);
    },

    async disconnect () {
        await this.client.close();
    },

    async getCollection (name: string): Promise<Collection> {
        return this.client.db().collection(name)
    },
    map(account) {
        const { _id, ...accountWithoutId } = account;
        return { ...accountWithoutId, id: _id };
    }
}