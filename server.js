require("dotenv").config();
const express = require('express');
const app = express();
const urlRouter = require('./src/routes/urlRoutes');
const connectToMongo = require('./src/config/db');

(async () => {
    try {
        const db = await connectToMongo();

        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        app.use(express.json());
        app.use('/url' ,urlRouter);

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
})();
