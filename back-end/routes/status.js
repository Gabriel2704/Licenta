const express = require('express');
const router = express.Router();
const status = require('../controllers/status');

router.get('/', status.getAll);
router.get('/:contestantId', status.getStatus);
router.put('/updateStatus/:id', status.updateStatus);

module.exports = router;