const express = require('express');
const router = express.Router();
const otherRouter = require('./db.js');
const user = require('./user');
const singleEvents = require('./single_events');
const contestants = require('./contestants');
const utils = require('./utils');
const status = require('./status');
const task = require('./task');

router.use("/", otherRouter);
router.use("/user", user);
router.use("/singleEvents", singleEvents);
router.use("/contestants", contestants);
router.use("/utils", utils);
router.use("/status", status);
router.use("/task", task);

module.exports = router;