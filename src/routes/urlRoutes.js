const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController')

router.get('/', urlController.getAllUrl)

router.post('/', urlController.createShortenedUrl)

router.get('/:shortUrl', urlController.redirectUrl)

module.exports = router;