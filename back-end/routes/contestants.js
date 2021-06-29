const express = require('express');
const router = express.Router();
const contestants = require('../controllers/contestants');

router.get('/:id', contestants.getContestants);
router.post('/addContestant', contestants.addContestant);

module.exports = router;