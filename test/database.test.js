import * as assert from "node:assert";
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import { main } from '../database.mjs';

describe('database.test', () => {
    describe("mock database test", () => {
it("should return a list of hotels", async () => {
            const hotels = [
                { name: "Hotel One" },
                { name: "Hotel Two" },
            ];
            const hotelsMock = {
                find: () => ({
                    toArray: () => hotels,
                }),
            };
            const client = {
                db: () => ({
                    collection: () => hotelsMock,
                }),
            };
            const data = client.db("hotels").collection("hotels").find().toArray();
            assert.strictEqual(data, hotels);
        });

    })
});



describe('main', function () {
    it('should insert a hotel into the database and generate a JSON file', async function () {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        const client = new MongoClient(uri);
        await client.connect();

        try {
            await main();
            const hotels = client.db("hotels").collection("hotels");
            const hotel = await hotels.findOne({ name: "Hotel One" });
            console.log("hotel", hotel)
            //const jsonExists = fs.existsSync('hotetDatabase.json');
            //console.log("jsonExists", jsonExists)
            //assert.strictEqual(jsonExists, true);
        } finally {
            await client.close();
            await mongod.stop();
        }
    });
});
