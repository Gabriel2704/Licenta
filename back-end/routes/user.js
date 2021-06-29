const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/:id', user.getUser);
router.post('/register/', user.register);
router.post('/login/', user.login);

module.exports = router;