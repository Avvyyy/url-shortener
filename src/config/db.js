const mongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME;

let db;


async function connectToMongo() {
    try {
        if (db) return db;

        const client = new mongoClient(url);

        await client.connect();
        console.log('Connected Sucessfully');

        db = client.db(dbName);
        return db;
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectToMongo;