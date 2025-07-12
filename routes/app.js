// route/app.js

const express = require('express');
const { ReturnDocument } = require('mongodb');
const router = express.Router();
const nanoid = require('nanoid').nanoid;



router.get('/', async (req, res) => {
    try {
        const urls = await req.db.collection('url_mapping').find().toArray();
        res.json(urls)
    } catch (err) {
        res.status(404).send("Url details could ot be found, try again later")
    }
})

// gets a url (post request)
// works on this url
// saves the initial and shortened url to the database

router.post('/', (req, res) => {
    const initial_url = req.body.initial_url;
    const shortened_url = nanoid(10);

    const payload = {
        initial_url, shortened_url, clicks: 0
    }

    req.db.collection('url_mapping').insertOne(payload)
    res.send(payload)
})


// redirect user to shortened url
router.get('/:shortUrl', async (req, res) => {
    const url = await req.db.collection('url_mapping').findOneAndUpdate({ shortened_url: req.params.shortUrl },
        { $inc: { clicks: 1 } },
        { returnDocument: "after" }
    )

    if (!url) {
        res.status(404).send("Page not found");
    }

    res.redirect(url.initial_url)
})

module.exports = router;