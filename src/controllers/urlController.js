// const nanoid = require('nanoid').nanoid;
const crypto = require('crypto')

function generateId(length=8) {
	let id = "";
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
	const bytes = crypto.randomBytes(length);
	for (let i = 0; i < length; i++) {
		const index  = bytes[i] % characters.length;
		id += characters[index];
	}
	return id;
}

exports.getAllUrl = async (req, res) => {
    try {
        const urls = await req.db.collection('url_mapping').find().toArray();
        res.json(urls)
    } catch (error) {
        res.status(404).send("Url details could not be found, try again later")
    }
}

exports.createShortenedUrl = async (req, res) => {
    try {
        const initial_url = req.body.initial_url;
        // const shortened_url = nanoid(10);
        const shortened_url = generateId(10);

        const payload = {
            initial_url, shortened_url, clicks: 0
        }

        req.db.collection('url_mapping').insertOne(payload)
        res.send(payload)
    } catch (error) {
        res.status(500).send("Internal sever error");
        console.error(error)
    }
}

exports.redirectUrl = async (req, res) => {
    try {
        const url = await req.db.collection('url_mapping').findOneAndUpdate({ shortened_url: req.params.shortUrl },
            { $inc: { clicks: 1 } },
            { returnDocument: "after" }
        )

        if (!url) {
            res.status(404).send("Page not found");
        }

        res.redirect(url.initial_url)
    } catch (error) {
        res.status(404).send("Page not found")
        console.error(error)
    }
}