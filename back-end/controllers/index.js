const resetController = require('./reset');
const user = require('./user');
const singleEvents = require('./single_events');
const contestants = require('./contestants');
const utils = require('./utils');
const status = require('./status');

const controller = {
    resetController,
    utils,
    user,
    singleEvents,
    contestants,
    status
};

module.exports = controller;