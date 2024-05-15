import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';

export async function main() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const hotels = client.db("hotels").collection("hotels");
        await hotels.insertOne({ name: "Hotel One" });
        const data = await hotels.find().toArray();
        console.log(data);
        fs.writeFileSync('hotetDatabase.json', JSON.stringify(data, null, 2));
         console.log("JSON file generated successfully.");
    } finally {
        await client.close();
        console.log("Disconnected from the database");
    }
}

main().catch(console.error);
