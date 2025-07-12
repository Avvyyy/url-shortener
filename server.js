// server.js
require("dotenv").config();
const express = require('express');
const app = express();
const router = require('./routes/app');
const connectToMongo = require('./db_config/mongodbConfig');

(async () => {
    try {
        const db = await connectToMongo();

        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        app.use(express.json());
        app.use(router);

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
})();
