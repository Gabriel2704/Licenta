const express = require('express');
const router = express.Router();
const utils = require('../controllers/utils');

router.post('/uploadPdf', utils.uploadPdf);

module.exports = router;