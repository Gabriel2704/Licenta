const express = require('express');
const router = express.Router();
const task = require('../controllers/task');

router.get('/:id', task.getTasks);
router.post('/addTask', task.addTask);
router.put('/updateTask/:id', task.updateTask);
router.delete('/deleteTask/:id', task.deleteTask);

module.exports = router;