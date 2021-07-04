const express = require('express');
const router = express.Router();
const task = require('../controllers/task');

router.get('/:id', task.getTasks);
router.post('/addTask', task.addTask);

module.exports = router;