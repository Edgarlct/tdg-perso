const assert = require('assert');
const MockMongoClient = require("../mockMongoClient");

describe('mock.test', () => {
    describe('find test', () => {
        it('find hotel should return an object hotel with status: OK', async () => {
            const client = new MockMongoClient();
            await client.connect();
            const hotel = await client.fetchOneBy('name', 'aaaaaaaaaaa');
            assert.strictEqual(hotel.name, 'aaaaaaaaaaa');
        });

        it('find a non existent hotel should return an empty array with status: OK', async () => {
            const client = new MockMongoClient();
            await client.connect();
            const hotel = await client.fetchOneBy('name', 'no');
            assert.strictEqual(hotel, undefined);
        });
    });
});
