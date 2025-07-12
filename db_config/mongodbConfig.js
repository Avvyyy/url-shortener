const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL
const dbName = 'url-mapping';

let db;


async function connectToMongo() {
    if (db) return db;

    const client = new MongoClient(url);

    await client.connect();
    console.log('Connected Sucessfully');

    db = client.db(dbName);
    return db;
}

module.exports = connectToMongo;